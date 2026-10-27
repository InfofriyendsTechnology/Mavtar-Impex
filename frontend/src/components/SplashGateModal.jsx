import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Instagram, PhoneCall, ExternalLink } from "lucide-react";
import { analyticsApi } from "../services/api";
import "./SplashGateModal.scss";

const SplashGateModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show if user enters directly and has not passed the gate in this session
    const hasPassed = sessionStorage.getItem("mavtar_gate_passed");
    if (!hasPassed) {
      setIsOpen(true);
    }
  }, []);

  const handleContinue = () => {
    analyticsApi
      .trackEvent({
        type: "SPLASH_ENTER",
        target: "continue_website",
        metadata: { path: window.location.pathname },
      })
      .catch(() => {});

    sessionStorage.setItem("mavtar_gate_passed", "true");
    setIsOpen(false);
  };

  const handleSocialClick = (platform, url) => {
    analyticsApi
      .trackEvent({
        type: "SOCIAL_LINK_CLICK",
        target: platform,
        metadata: { url },
      })
      .catch(() => {});
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="splash-gate-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="splash-gate-overlay"
      >
        <div className="gate-grid-pattern" />

        <motion.div
          key="splash-gate-card"
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="splash-gate-card"
        >
          {/* Brand */}
          <div className="gate-brand-box">
            <h1 className="gate-title">MAVTAR IMPEX</h1>
            <p className="gate-subtitle">Luxury Embroidered Linen Bags</p>
          </div>

          <div className="gate-divider-line" />

          {/* Simple Button Action */}
          <div className="gate-action-section">
            <p className="gate-prompt-text">Welcome to Mavtar Impex</p>
            <button onClick={handleContinue} className="btn-gate-continue">
              <span>Continue to Website</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Social Links */}
          <div className="gate-social-bio">
            <span className="bio-label">Connect with Us</span>
            
            <div className="bio-links-grid">
              <a
                href="https://www.instagram.com/mavtar_impex/"
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("instagram", "https://www.instagram.com/mavtar_impex/")}
                className="bio-chip"
              >
                <Instagram size={15} />
                <span>Instagram</span>
                <ExternalLink size={12} className="external-arrow" />
              </a>

              <a
                href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20would%20like%20to%20connect."
                target="_blank"
                rel="noreferrer"
                onClick={() => handleSocialClick("whatsapp", "https://wa.me/919512753471")}
                className="bio-chip"
              >
                <PhoneCall size={15} />
                <span>WhatsApp</span>
                <ExternalLink size={12} className="external-arrow" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashGateModal;
