// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accesstoken");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = (newToken) => {
    localStorage.setItem("accesstoken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("accesstoken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
