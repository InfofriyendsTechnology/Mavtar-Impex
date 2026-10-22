import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, PhoneCall } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop All Bags", path: "/shop" },
    { name: "Royal Haathi Edition", path: "/shop?category=royal-heritage" },
    { name: "Everyday Linen", path: "/shop?category=everyday-minimal" },
    { name: "Gifting & Bulk", path: "/bulk-inquiry" },
    { name: "Our Craft", path: "/craftsmanship" },
    { name: "Track Order", path: "/track" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname + location.search === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-linen-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-linen-800 hover:text-emerald-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-emerald-950 group-hover:text-emerald-800 transition-colors">
                  MAVTAR IMPEX
                </span>
              </div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold-600 font-semibold mt-0.5">
                Artisanal Linen & Royal Embroidery
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors py-1 relative ${
                  isActive(link.path)
                    ? "text-emerald-900 font-semibold border-b-2 border-gold-500"
                    : "text-linen-700 hover:text-emerald-900"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Direct WhatsApp Concierge Button for Customers */}
            <a
              href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20have%20an%20inquiry%20regarding%20your%20luxury%20embroidered%20linen%20bags."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-950 hover:text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-900/20 hover:border-gold-500 bg-linen-100/60 transition-all font-medium"
              title="WhatsApp Concierge"
            >
              <PhoneCall className="w-3.5 h-3.5 text-gold-600" />
              <span>WhatsApp Support</span>
            </a>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-emerald-950 hover:text-emerald-800 transition-colors rounded-full hover:bg-linen-100 flex items-center justify-center"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-800 text-gold-200 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-linen-200 bg-linen-50 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? "bg-emerald-900 text-gold-300 font-semibold"
                  : "text-linen-800 hover:bg-linen-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-linen-200">
            <a
              href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20have%20an%20inquiry%20regarding%20your%20luxury%20embroidered%20linen%20bags."
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-emerald-950 font-medium hover:bg-linen-200 rounded-md"
            >
              <PhoneCall className="w-4 h-4 text-gold-600" />
              <span>Direct WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;