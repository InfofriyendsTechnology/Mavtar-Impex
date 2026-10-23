import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/shop" },
    { name: "Royal Edition", path: "/shop?category=royal-heritage" },
    { name: "Our Craft", path: "/craftsmanship" },
    { name: "Bespoke & Bulk", path: "/bulk-inquiry" },
    { name: "Track Order", path: "/track" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname + location.search === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 transition-all shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0 min-w-0">
            <Link to="/" className="inline-block group text-left">
              <span className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors whitespace-nowrap block">
                MAVTAR IMPEX
              </span>
              <span className="text-[8px] sm:text-[9.5px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-zinc-500 font-semibold block -mt-0.5 whitespace-nowrap">
                Artisanal Linen & Royal Embroidery
              </span>
            </Link>
          </div>

          {/* Desktop Navigation with Framer Motion Active Indicator */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide whitespace-nowrap transition-colors rounded-full ${
                    active
                      ? "text-zinc-900 font-bold"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {active && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-zinc-100 border border-zinc-300 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            
            {/* Direct WhatsApp Concierge Button */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20have%20an%20inquiry%20regarding%20your%20luxury%20embroidered%20linen%20bags."
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-xs text-zinc-900 hover:text-black px-3.5 py-2 rounded-full border border-zinc-300 hover:border-zinc-400 bg-zinc-50 hover:bg-white transition-all font-semibold whitespace-nowrap shadow-sm"
              title="WhatsApp Concierge"
            >
              <PhoneCall className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
              <span>WhatsApp Support</span>
            </motion.a>

            {/* Shopping Cart Trigger */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-zinc-900 hover:text-black transition-colors rounded-full hover:bg-zinc-100 flex items-center justify-center border border-zinc-200 shadow-sm"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-900" />
              {totalItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-zinc-900 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md"
                >
                  {totalItemsCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with Smooth Framer Motion Accordion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="xl:hidden overflow-hidden border-t border-zinc-200 bg-white shadow-lg"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${
                      active
                        ? "bg-zinc-900 text-white font-bold"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 mt-2 border-t border-zinc-100">
                <a
                  href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20have%20an%20inquiry%20regarding%20your%20luxury%20embroidered%20linen%20bags."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3 text-sm text-zinc-900 font-bold bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-zinc-600" />
                  <span>Direct WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
