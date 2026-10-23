import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authApi } from "../services/api";
import { loginSuccess, logout as reduxLogout } from "../store/authSlice";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
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
            dispatch(loginSuccess({ user: res.data.user, token }));
          }
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token, dispatch]);

  const login = async (identifier, password) => {
    try {
      const res = await authApi.login({ identifier, password });
      if (res.success && res.data?.token) {
        setToken(res.data.token);
        setAdmin(res.data.user);
        localStorage.setItem("mavtar_admin_token", res.data.token);
        localStorage.setItem("mavtar_admin_user", JSON.stringify(res.data.user));
        dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));

        toast.success(`Welcome back, ${res.data?.user?.name || "Krish Vaghani"}!`, {
          style: {
            background: "#18181B",
            color: "#FFFFFF",
            border: "1px solid #3F3F46",
            borderRadius: "9999px",
            fontSize: "13px",
            padding: "10px 18px",
          },
        });
        return true;
      }
      return false;
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid login credentials";
      toast.error(msg, {
        style: {
          background: "#18181B",
          color: "#FFFFFF",
          border: "1px solid #3F3F46",
          borderRadius: "9999px",
          fontSize: "13px",
          padding: "10px 18px",
        },
      });
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem("mavtar_admin_token");
    localStorage.removeItem("mavtar_admin_user");
    dispatch(reduxLogout());
    toast("Logged out securely", {
      style: {
        background: "#18181B",
        color: "#A1A1AA",
        borderRadius: "9999px",
        fontSize: "13px",
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        token,
        loading,
        isAuthenticated: !!token,
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
