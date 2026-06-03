import React, { createContext, useState, useEffect } from "react";
import * as authService from "../services/auth.service.js";

// 1. Create and export the Auth Context
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const refreshUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // REMOVED: if(!user) { return }
        // We WANT to fetch the user from the backend if our local state is null.
        if(user) {
          setLoading(false);
          return;
        }
        const response = await authService.API.get('/api/auth/me');
        setUser(response.data.user);
      } catch (err) {
        // If the user isn't logged in, or token expired, we just keep user as null
        setUser(null); 
        // Optional: Only set an error if it's a network issue, not a 401 Unauthorized
        if (err.response && err.response.status !== 401) {
          setError(err.message || 'Unable to verify user');
        }
      } finally {
        setLoading(false);
      }
    };
    
    refreshUser();
  }, [user]);

  const register = async ({ name, email, password }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register({ name, email, password });
      console.log(response,"and ",{ name, email, password });
      
      setUser(response?.user ?? null);
      return response;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login({ email, password });
      console.log(response,"and ",{ email, password });
      
      setUser(response?.user ?? null);
      return response;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError(err.message || 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (payload) => {
    try {
      const response = await authService.updateProfile(payload);

      setLoading(true);
      setError(null);
      setUser(response?.user ?? user);
      return response;
    } catch (err) {
      setError(err.message || 'Profile update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    setError,
    register,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };