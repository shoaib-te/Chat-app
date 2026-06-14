import React, { createContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service.js";
import { io } from "socket.io-client";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [onlineUser, setonlineUser] = useState([]);
  const [Sockit, setSockit] = useState(null);
 console.log('line 14 socket',onlineUser);
  const backendurl = import.meta.env.VITE_API_URL;

  const Sockitconnect = (userId) => {
    
    
    if (!userId) return;
    if (Sockit?.connected) return;

    const newSockit = io(backendurl, {
      query: { 
         userId: userId,
         },
    });

    newSockit.connect();
   ;
    
    setSockit(newSockit);

    newSockit.on("getonlineuser", (userIds) => {
     console.log(userIds,'userids');
     
      setonlineUser(userIds);
      
      
    });
  };

  useEffect(() => {
    let isMounted = true;

    const refreshUser = async () => {
      try {
        setLoading(true);
        setError(null);

        if (user) {
          setLoading(false);
          return;
        }

        const response = await authService.API.get("/api/auth/me");
        const me = response?.data?.user;
        
        
        if (!isMounted) return;

        setUser(me);
        Sockitconnect(me._id);
      } catch (err) {
        if (!isMounted) return;
        setUser(null);

        if (err?.response && err.response.status !== 401) {
          setError(err.message || "Unable to verify user");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    refreshUser();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    return () => {
      if (!Sockit) return;
      try {
        Sockit.disconnect();
      } catch {
        // ignore
      }
    };
  }, [Sockit]);

  const register = async ({ name, email, password }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register({ name, email, password });
      setUser(response?.user ?? null);
      return response;
    } catch (err) {
      setError(err?.message || "Registration failed");
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
      setUser(response?.user ?? null);
      return response;
    } catch (err) {
      setError(err?.message || "Login failed");
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
      setSockit(null);
      setonlineUser([]);
    } catch (err) {
      setError(err?.message || "Logout failed");
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
      setError(err?.message || "Profile update failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        register,
        login,
        logout,
        updateProfile,
        searchFilter,
        setSearchFilter,
        onlineUser,
        Sockit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };

