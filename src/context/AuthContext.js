import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from "../api/AuthService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setLogged(true);
    }
  }, []);

  const login = async (userData) => {
    console.log("Perform LOGIN request");
    const response = await AuthService.login(userData);
    if(response.status === 200){
      let user = response.data;
      console.log(user);
      localStorage.clear();
      localStorage.setItem('accessToken', user.access);
      localStorage.setItem('refreshToken', user.refresh);
      setUser(user.user);
    } else {
      console.log("Error while trying to LOGIN with status code = "+response.status);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
