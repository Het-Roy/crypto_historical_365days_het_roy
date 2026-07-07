import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, fetchUserProfile } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Initialize user if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const profile = await fetchUserProfile();
          if (profile && profile.data) {
            setUser(profile.data);
          } else {
            // Token is invalid, silently clear it
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch {
          // Token is invalid, silently clear it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []); // Only run once on mount, not on every token change

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.user);
      return { success: true };
    }
    return { success: false, error: 'Login failed' };
  };

  const register = async (email, password) => {
    const response = await registerUser(email, password);
    if (response && response.token) {
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setUser(response.user);
      return { success: true };
    }
    return { success: false, error: 'Registration failed' };
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
