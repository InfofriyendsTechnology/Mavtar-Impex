import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authApi } from "../services/api";
import { loginSuccess, logout as reduxLogout } from "../store/authSlice";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Admin Auth State
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem("mavtar_admin_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("mavtar_admin_token") || null);

  // Customer Auth State
  const [customer, setCustomer] = useState(() => {
    try {
      const saved = localStorage.getItem("mavtar_customer_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [customerToken, setCustomerToken] = useState(
    () => localStorage.getItem("mavtar_customer_token") || null
  );

  // Customer Login Modal State (triggered automatically on cart add or manually)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState(""); // e.g. "cart" | "header"

  const [loading, setLoading] = useState(true);

  // Verify Admin Session on mount
  useEffect(() => {
    if (token) {
      authApi
        .getMe()
        .then((res) => {
          const userData = res.data?.user || res.data;
          if (res.success && userData) {
            setAdmin(userData);
            localStorage.setItem("mavtar_admin_user", JSON.stringify(userData));
            dispatch(loginSuccess({ user: userData, token }));
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

  // Admin Login
  const login = async (identifier, password) => {
    try {
      const res = await authApi.login({
        mobile: identifier,
        identifier,
        password,
      });
      const userData = res.data?.user || res.data;
      if (res.success && res.data?.token) {
        setToken(res.data.token);
        setAdmin(userData);
        localStorage.setItem("mavtar_admin_token", res.data.token);
        localStorage.setItem("mavtar_admin_user", JSON.stringify(userData));
        dispatch(loginSuccess({ user: userData, token: res.data.token }));

        toast.success(`Welcome back, ${userData?.name || "Krish"}!`, {
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

  // Customer Google Login
  const loginWithGoogle = async (googlePayload) => {
    try {
      const res = await authApi.googleAuth(googlePayload);
      if (res.success && res.data?.token) {
        const user = res.data.user || res.data;
        setCustomer(user);
        setCustomerToken(res.data.token);
        localStorage.setItem("mavtar_customer_user", JSON.stringify(user));
        localStorage.setItem("mavtar_customer_token", res.data.token);
        setIsAuthModalOpen(false);

        toast.success(`Welcome to Mavtar Impex, ${user.name}!`, {
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
      const msg = err.response?.data?.message || "Google authentication failed";
      toast.error(msg, {
        style: {
          background: "#18181B",
          color: "#FFFFFF",
          border: "1px solid #3F3F46",
          borderRadius: "9999px",
          fontSize: "13px",
        },
      });
      return false;
    }
  };

  // Customer Mobile/Email Direct Login
  const loginAsCustomer = async (data) => {
    try {
      const res = await authApi.customerLogin(data);
      if (res.success && res.data?.token) {
        const user = res.data.user || res.data;
        setCustomer(user);
        setCustomerToken(res.data.token);
        localStorage.setItem("mavtar_customer_user", JSON.stringify(user));
        localStorage.setItem("mavtar_customer_token", res.data.token);
        setIsAuthModalOpen(false);

        toast.success(`Welcome back, ${user.name}!`, {
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
      const msg = err.response?.data?.message || "Sign in failed";
      toast.error(msg, {
        style: {
          background: "#18181B",
          color: "#FFFFFF",
          border: "1px solid #3F3F46",
          borderRadius: "9999px",
          fontSize: "13px",
        },
      });
      return false;
    }
  };

  // Customer Logout
  const logoutCustomer = () => {
    setCustomer(null);
    setCustomerToken(null);
    localStorage.removeItem("mavtar_customer_user");
    localStorage.removeItem("mavtar_customer_token");
    toast("Signed out successfully", {
      style: {
        background: "#18181B",
        color: "#A1A1AA",
        borderRadius: "9999px",
        fontSize: "13px",
      },
    });
  };

  const openAuthModal = (reason = "manual") => {
    setAuthModalReason(reason);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
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
        // Customer Auth
        customer,
        customerToken,
        isCustomerLoggedIn: !!customerToken,
        loginWithGoogle,
        loginAsCustomer,
        logoutCustomer,
        // Modal Controls
        isAuthModalOpen,
        authModalReason,
        openAuthModal,
        closeAuthModal,
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
