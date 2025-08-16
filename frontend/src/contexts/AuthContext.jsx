// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // hydrate from localStorage on refresh
  useEffect(() => {
    const t = localStorage.getItem('token');
    const u = localStorage.getItem('user');
    if (t) setToken(t);
    if (u) {
      try {
        const parsed = JSON.parse(u);
        if (parsed?.username) setUsername(parsed.username);
      } catch {}
    }
  }, []);

  const login = (usernameStr, jwtToken) => {
    setUsername(usernameStr);
    setToken(jwtToken);
  };

  const logout = () => {
    setUsername(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
