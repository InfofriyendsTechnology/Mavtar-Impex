import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  ShieldCheck,
  ChevronDown,
  RotateCw,
  ExternalLink,
  Store,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./AdminLayout.scss";

const AdminLayout = () => {
  const { admin, isAuthenticated, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF7F2" }}>
        <div style={{ width: 36, height: 36, border: "3px solid #E4E4E7", borderTopColor: "#18181B", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
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

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setRefreshKey((prev) => prev + 1);
    toast.success("Page refreshed", { id: "outlet-refresh", duration: 1500 });
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const displayName = admin?.name || "Krish Vaghani";
  const avatarInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "KV";

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
                  <Icon className="sidebar-icon" size={18} />
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
        
        {/* Floating Capsule Header matching Rent360 */}
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

          {/* Right Header Controls matching Rent360 CRM style */}
          <div className="header-actions">
            
            {/* 1. Refresh Button with Smooth Spin */}
            <button
              type="button"
              className={`header-action-icon refresh-btn ${isRefreshing ? "spinning" : ""}`}
              onClick={handleRefresh}
              title="Refresh Data"
              aria-label="Refresh Data"
            >
              <RotateCw size={16} />
            </button>

            {/* 2. View Store Button */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="header-action-pill store-link"
              title="View Public Store"
            >
              <Store size={15} />
              <span>View Store</span>
            </a>

            {/* 3. Luxury User Profile Capsule with Interactive Dropdown */}
            <div className="profile-dropdown-container" ref={dropdownRef}>
              <button
                type="button"
                className="user-profile-capsule"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="User menu"
                aria-expanded={isDropdownOpen}
              >
                <div className="profile-avatar">
                  <span>{avatarInitials}</span>
                </div>
                <span className="profile-display-name">{displayName}</span>
                <ChevronDown size={14} className={`chevron-icon ${isDropdownOpen ? "rotated" : ""}`} />
              </button>

              {/* Floating Dropdown Menu */}
              {isDropdownOpen && (
                <div className="profile-dropdown-menu">
                  <div className="dropdown-header">
                    <div className="dropdown-user-name">{displayName}</div>
                    <div className="dropdown-role-pill">SUPER ADMIN</div>
                    <div className="dropdown-store-sub">Mavtar Impex Workspace</div>
                  </div>

                  <div className="dropdown-divider" />

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/admin/settings");
                    }}
                  >
                    <Settings size={15} className="item-icon" />
                    <span>Store Settings</span>
                  </button>

                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <ExternalLink size={15} className="item-icon" />
                    <span>Open Live Store</span>
                  </a>

                  <div className="dropdown-divider" />

                  <button
                    type="button"
                    className="dropdown-item logout-item"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                  >
                    <LogOut size={15} className="item-icon" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* Dynamic Content - Refreshes outlet workspace on demand without full window reload */}
        <main className="dashboard-content" key={refreshKey}>
          <Outlet context={{ refreshKey, triggerRefresh: handleRefresh }} />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
