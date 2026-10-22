import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./AdminLayout.scss";

const AdminLayout = () => {
  const { admin, isAuthenticated, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF7F2" }}>
        <div style={{ width: 36, height: 36, border: "3px solid #0B4633", borderTopColor: "#C5A059", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/admin/login");
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Linen Bags Catalog", path: "/admin/products", icon: ShoppingBag },
    { name: "Customer Orders", path: "/admin/orders", icon: Package },
    { name: "Bulk Inquiries", path: "/admin/inquiries", icon: MessageSquare },
    { name: "Store Settings", path: "/admin/settings", icon: Settings },
  ];

  const getPageTitle = () => {
    const current = navItems.find((item) =>
      item.path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(item.path)
    );
    return current ? current.name : "Dashboard";
  };

  return (
    <div className="dashboard-layout">
      
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Modern Floating Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "mobile-open" : ""}`}>
        <div>
          {/* Brand Logo & Name */}
          <div className="sidebar-brand">
            <div className="brand-logo-card">
              <ShieldCheck />
            </div>
            <div className="brand-title-wrap">
              <span className="brand-name">Mavtar Impex</span>
              <span className="brand-sub">Admin Workspace</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `nav-link-pill ${isActive ? "active" : ""}`
                  }
                >
                  <Icon />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button onClick={logout} className="footer-action-btn logout">
            <LogOut />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="dashboard-main">
        
        {/* Floating Capsule Header */}
        <header className="dashboard-header-capsule">
          
          <div className="header-left-wrap">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mobile-hamburger-btn"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>

            <div className="header-breadcrumbs">
              <span className="crumb-root">Mavtar Impex</span>
              <span className="crumb-slash">/</span>
              <span className="crumb-active">{getPageTitle()}</span>
            </div>
          </div>

          <div className="header-right-wrap">
            {/* Clean Professional User Profile Capsule */}
            <div className="user-profile-capsule">
              <div className="profile-avatar">
                <span>KV</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", textAlign: "left", lineHeight: 1.2 }}>
                <span className="profile-display-name" style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-main)" }}>
                  {admin?.name || "Krish Vaghani"}
                </span>
                <span className="role-badge" style={{ fontSize: "0.68rem", color: "#C5A059", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  👑 Super Admin
                </span>
              </div>
            </div>
          </div>

        </header>

        {/* Dynamic Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
