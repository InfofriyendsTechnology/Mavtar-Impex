import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, PhoneCall, Home, LayoutGrid, Sparkles, Layers, MessageSquare, Truck, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Navbar.scss";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { customer, isCustomerLoggedIn, openAuthModal, logoutCustomer } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    { name: "Collection", path: "/shop", icon: <LayoutGrid size={16} /> },
    { name: "Royal Edition", path: "/shop?category=royal-heritage", icon: <Sparkles size={16} /> },
    { name: "Our Craft", path: "/craftsmanship", icon: <Layers size={16} /> },
    { name: "Bespoke & Bulk", path: "/bulk-inquiry", icon: <MessageSquare size={16} /> },
    { name: "Track Order", path: "/track", icon: <Truck size={16} /> },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname + location.search === path;
  };

  return (
    <header className="site-header">
      <div className="nav-inner-container">
        <div className="nav-bar-row">
          
          {/* Mobile Menu Button with smooth icon state */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
          >
            <motion.div
              key={mobileMenuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>

          {/* Brand Logo */}
          <Link to="/" className="nav-brand-link">
            <span className="brand-name">MAVTAR IMPEX</span>
            <span className="brand-sub">Handcrafted Linen</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-link-pill ${active ? "active" : ""}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="nav-right-actions">
            <a
              href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20have%20an%20inquiry%20regarding%20your%20luxury%20embroidered%20linen%20bags."
              target="_blank"
              rel="noreferrer"
              className="btn-concierge"
              title="WhatsApp Concierge"
            >
              <PhoneCall size={13} />
              <span>WhatsApp Support</span>
            </a>

            {/* Patron Account / Login Trigger */}
            <button
              onClick={() => {
                if (isCustomerLoggedIn) {
                  if (window.confirm(`Signed in as ${customer?.name || "Patron"}. Would you like to sign out?`)) {
                    logoutCustomer();
                  }
                } else {
                  openAuthModal("header");
                }
              }}
              className="btn-patron-auth"
              title={isCustomerLoggedIn ? `Patron: ${customer?.name || "Account"}` : "Sign In / Continue with Google"}
              aria-label="Patron Account"
            >
              {isCustomerLoggedIn && customer?.avatar ? (
                <img src={customer.avatar} alt={customer.name} className="patron-avatar-img" />
              ) : isCustomerLoggedIn ? (
                <span className="patron-avatar-initial">{(customer?.name || "P").charAt(0)}</span>
              ) : (
                <User size={18} />
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-cart-trigger"
              aria-label="View Cart"
            >
              <ShoppingBag size={18} />
              {totalItemsCount > 0 && <span className="cart-badge">{totalItemsCount}</span>}
            </button>
          </div>

        </div>
      </div>

      {/* Silky Smooth Luxury Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-drawer-menu"
          >
            <motion.div 
              className="mobile-drawer-inner"
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {navLinks.map((link, idx) => {
                const active = isActive(link.path);
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx + 0.06, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`mobile-nav-link ${active ? "active" : ""}`}
                    >
                      <span className="link-icon-box">{link.icon}</span>
                      <span className="link-text">{link.name}</span>
                      {active && <span className="active-dot" />}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 * navLinks.length + 0.08, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="mobile-concierge-link"
              >
                <a
                  href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20have%20an%20inquiry%20regarding%20your%20luxury%20embroidered%20linen%20bags."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PhoneCall size={14} />
                  <span>WhatsApp Concierge (+91 95127 53471)</span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;