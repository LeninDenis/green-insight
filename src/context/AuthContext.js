import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from "../api/AuthService";
import {setupInterceptors} from "../api/axiosInstance";
import {toast} from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    setupInterceptors(refresh, logout);
    const savedUser = localStorage.getItem('user');
    if (savedUser){
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        setLogged(true);
        setUser(JSON.parse(savedUser));
      } else {
        logout();
        setLogged(false);
      }
    } else {
      logout();
      setLogged(false);
    }
  }, []);

  const refresh = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if(!refreshToken){
        return null;
      }
      const response = await AuthService.refresh(refreshToken);
      if (response.status === 200) {
        const newAccessToken = response.data.access;
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', response.data.refresh)
        return newAccessToken;
      }
      return null;
    } catch (e) {
      console.error("Error while trying to update access: ", e);
      return null;
    }
  };

  const login = async (userData) => {
    console.log("Perform LOGIN request");
    const response = await AuthService.login(userData);
    if(response.status === 200){
      let user = response.data;
      console.log(user);
      logout();
      localStorage.setItem('accessToken', user.access);
      localStorage.setItem('refreshToken', user.refresh);
      localStorage.setItem('user', JSON.stringify(user.user));
      toast.success("Вы вошли в аккаунт!");
    } else {
      toast.error(response.data?.message || "Ошибка сервера, повторите попытку позднее");
      throw new Error("Error while trying to LOGIN with status code = "+response.status);
    }
    return response;
  };

  const register = async (formData) => {
    console.log("Performing REGISTER request");
    const regResponse = await AuthService.register(formData);
    if(regResponse.status === 201){
      console.log("User registered successfully");
      console.log(regResponse.data);
      let userData = {
        email: formData.email,
        password: formData.password
      };
      console.log("Getting tokens and user data...");
      toast.success("Регистрация прошла успешно!");
      await login(userData);
    } else {
      toast.error(regResponse.data?.message || "Ошибка сервера, повторите попытку позднее");
      throw new Error("Error while trying to REGISTER with status code = "+regResponse.status);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setLogged(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logged, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
