import React, { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem("mavtar_admin_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("mavtar_admin_token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      authApi
        .getMe()
        .then((res) => {
          if (res.success && res.data?.user) {
            setAdmin(res.data.user);
            localStorage.setItem("mavtar_admin_user", JSON.stringify(res.data.user));
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (identifier, password) => {
    try {
      const res = await authApi.login({ identifier, password });
      if (res.success && res.data?.token) {
        setToken(res.data.token);
        setAdmin(res.data.user);
        localStorage.setItem("mavtar_admin_token", res.data.token);
        localStorage.setItem("mavtar_admin_user", JSON.stringify(res.data.user));
        toast.success("Welcome back to Mavtar Impex Admin Portal!");
        return true;
      }
      return false;
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid login credentials";
      toast.error(msg);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("mavtar_admin_token");
    localStorage.removeItem("mavtar_admin_user");
    toast.success("Admin session ended");
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
