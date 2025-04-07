import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

const baseAxios = axios.create({
    baseURL: API_BASE_URL
});

const authAxios = axios.create({
    baseURL: API_BASE_URL
});

const setupInterceptors = (refresh, logout) => {
    if (authAxios.interceptors.request.handlers.length > 0) {
        authAxios.interceptors.request.clear();
    }
    if (authAxios.interceptors.response.handlers.length > 0) {
        authAxios.interceptors.response.clear();
    }
    authAxios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    authAxios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response &&
                error.response.status === 401 &&
                !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newToken = await refresh();
                    if (newToken) {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return baseAxios(originalRequest);
                    } else {
                        logout();
                        return Promise.reject(error);
                    }
                } catch (refreshError) {
                    console.error("Unable to update token:", refreshError);
                    logout();
                    return Promise.reject(refreshError);
                }
            }
            return Promise.reject(error);
        }
    );
};

export { baseAxios, authAxios, setupInterceptors };