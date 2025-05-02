import { baseAxios } from "./axiosInstance";

export default class AuthService {
    static async login(userData) {
        const authString = btoa(`${userData.email}:${userData.password}`);
        const headers = {
            Authorization: `Basic ${authString}`
        };
        const response = await baseAxios
            .post('/auth/login', null, { headers });
        return response;
    }

    // {"fname": "", "lname": "", "email": "", "password": ""}
    static async register(newUserForm) {
        const response = await baseAxios
            .post('/auth/register', newUserForm);
        return response;
    }

    static async refresh(refreshToken) {
        const body = {
            token: refreshToken,
            tokenType: "REFRESH"
        };
        const response = await baseAxios
            .post('/auth/refresh', body);
        return response;
    }
}
