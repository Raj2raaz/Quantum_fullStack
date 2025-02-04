import React, { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser, registerUser } from "./ApiService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const handleSignup = async(userData) => {
    const response = await registerUser(userData);
    return response;
  }

  const handleLogin = async (userData) => {
    const response = await loginUser(userData);
    if (!response.error) {
      setUser({ token: response.token });
    }
    return response;
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
};
