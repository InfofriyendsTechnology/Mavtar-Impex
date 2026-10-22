import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./AdminLogin.scss";

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(identifier, password);
    setLoading(false);
    if (success) {
      navigate("/admin");
    }
  };

  return (
    <div className="bond-login-layout">
      <div className="bond-login-card">
        
        {/* Brand Header */}
        <div className="login-brand-header">
          <div className="brand-logo-pill">
            <ShieldCheck />
          </div>
          <h1 className="brand-title">Mavtar Impex</h1>
          <p className="brand-subtitle">Executive Backoffice • Krish Vaghani</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username / Mobile Number</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <User size={18} />
              </span>
              <input
                type="text"
                required
                autoComplete="username"
                placeholder="Enter username or mobile"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="bond-submit-btn">
            {loading ? (
              <div className="spinner" />
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Sign In to Admin Portal</span>
              </>
            )}
          </button>
        </form>

        <div className="login-card-footer">
          <Link to="/">
            <ArrowLeft size={16} />
            <span>Back to Public Store</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
