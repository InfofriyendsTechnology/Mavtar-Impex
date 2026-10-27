import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ShoppingBag, Truck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import "./CustomerAuthModal.scss";

const CustomerAuthModal = () => {
  const { isAuthModalOpen, authModalReason, closeAuthModal, loginWithGoogle, loginAsCustomer } = useAuth();
  const { setIsCartOpen } = useCart();

  const [identifier, setIdentifier] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [googleEmailInput, setGoogleEmailInput] = useState("");
  const [showGoogleInput, setShowGoogleInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [patronSuccessProfile, setPatronSuccessProfile] = useState(null);

  // Initialize Google Identity Services
  useEffect(() => {
    if (!isAuthModalOpen) return;

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (googleClientId && window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response) => {
            if (response.credential) {
              loginWithGoogle({ credential: response.credential }).then((ok) => {
                if (ok) {
                  setPatronSuccessProfile({
                    name: "Patron Member",
                    email: "Google Account Connected",
                    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Patron",
                  });
                  toast.success("Profile connected");
                }
              });
            }
          },
        });

        const targetDiv = document.getElementById("googleOfficialBtn");
        if (targetDiv) {
          window.google.accounts.id.renderButton(targetDiv, {
            theme: "outline",
            size: "large",
            width: "100%",
            text: "continue_with",
            shape: "pill",
            logo_alignment: "left",
          });
        }
      } catch (err) {
        console.warn("Google Identity initialization:", err);
      }
    }
  }, [isAuthModalOpen]);

  const handleContinueAsGuest = () => {
    setPatronSuccessProfile(null);
    closeAuthModal();
    if (authModalReason === "cart") {
      setIsCartOpen(true);
    }
  };

  const handleDirectSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    setIsSubmitting(true);
    const success = await loginAsCustomer({
      identifier: identifier.trim(),
      name: name.trim() || undefined,
      password: password || undefined,
    });
    setIsSubmitting(false);

    if (success) {
      setPatronSuccessProfile({
        name: name.trim() || identifier.split("@")[0] || "Patron",
        email: identifier.includes("@") ? identifier.trim() : `Mobile: ${identifier.trim()}`,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || identifier)}`,
      });
      toast.success("Signed in");
    }
  };

  const handleGoogleBtnClick = () => {
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (googleClientId && window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      setShowGoogleInput((prev) => !prev);
    }
  };

  const handleInlineGoogleSubmit = async (e) => {
    e.preventDefault();
    if (!googleEmailInput.trim()) return;

    setIsSubmitting(true);
    const rawName = googleEmailInput.split("@")[0].replace(/[._]/g, " ");
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    const patronAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(rawName)}`;

    const success = await loginWithGoogle({
      email: googleEmailInput.trim(),
      name: formattedName,
      googleId: `g_${Date.now()}`,
      avatar: patronAvatar,
    });
    setIsSubmitting(false);

    if (success) {
      setPatronSuccessProfile({
        name: formattedName,
        email: googleEmailInput.trim(),
        avatar: patronAvatar,
      });
      toast.success("Profile connected");
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="customer-auth-overlay">
        {/* Backdrop */}
        <motion.div
          className="auth-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleContinueAsGuest}
        />

        {/* Modal Window: Big Welcome Popup when Profile is Connected */}
        {patronSuccessProfile ? (
          <motion.div
            key="patron-success-modal"
            className="customer-auth-card patron-welcome-large-card"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close */}
            <button onClick={handleContinueAsGuest} className="btn-close-modal" aria-label="Close modal">
              <X size={18} />
            </button>

            <div className="patron-badge-chip">
              <CheckCircle2 size={15} />
              <span>Google Profile Connected</span>
            </div>

            <div className="patron-avatar-display">
              <img src={patronSuccessProfile.avatar} alt={patronSuccessProfile.name} />
              <div className="google-badge-circle">
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
              </div>
            </div>

            <h2 className="patron-welcome-title">Welcome to Mavtar Impex, {patronSuccessProfile.name}!</h2>
            <p className="patron-welcome-email">{patronSuccessProfile.email}</p>

            {/* Rich Patron Messages */}
            <div className="patron-messages-container">
              <div className="patron-msg-card">
                <div className="msg-icon-box">
                  <Sparkles size={16} />
                </div>
                <div className="msg-content">
                  <h4>Surat Atelier Priority Looms</h4>
                  <p>Your orders receive priority queue status across our Surat computerized embroidery looms.</p>
                </div>
              </div>

              <div className="patron-msg-card">
                <div className="msg-icon-box">
                  <Truck size={16} />
                </div>
                <div className="msg-content">
                  <h4>Insured Doorstep Tracking</h4>
                  <p>Real-time SMS and WhatsApp milestone notifications dispatched at every weaving step.</p>
                </div>
              </div>

              <div className="patron-msg-card">
                <div className="msg-icon-box">
                  <ShoppingBag size={16} />
                </div>
                <div className="msg-content">
                  <h4>Bespoke Bridal Gifting Inquiries</h4>
                  <p>Instant wholesale tier discounts and complimentary initials vector embroidery digitizing.</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-patron-continue"
              onClick={handleContinueAsGuest}
            >
              <span>{authModalReason === "cart" ? "Proceed to My Bag" : "Explore Handcrafted Collection"}</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>
        ) : (
          /* Standard Auth Form */
          <motion.div
            key="patron-auth-modal"
            className="customer-auth-card"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button onClick={handleContinueAsGuest} className="btn-close-modal" aria-label="Close modal">
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="auth-header">
              <div className="auth-tag">
                <Sparkles size={11} />
                <span>Customer Account</span>
              </div>
              <h2>Welcome to Mavtar Impex</h2>
              <p>
                {authModalReason === "cart"
                  ? "Your bag is updated! Sign in to save shipping addresses and track orders."
                  : "Sign in with Google or enter your details below for swift checkout."}
              </p>
            </div>

            {/* Primary: Continue with Google */}
            <div className="auth-actions-group">
              <div id="googleOfficialBtn" className="google-official-container" />

              <button
                type="button"
                onClick={handleGoogleBtnClick}
                className="btn-google-continue"
              >
                <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* In-Card Google Email Form */}
              <AnimatePresence>
                {showGoogleInput && (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onSubmit={handleInlineGoogleSubmit}
                    className="inline-google-box"
                  >
                    <label>Enter Google Account Email</label>
                    <div className="input-row">
                      <input
                        type="email"
                        placeholder="your.email@gmail.com"
                        value={googleEmailInput}
                        onChange={(e) => setGoogleEmailInput(e.target.value)}
                        required
                        autoFocus
                      />
                      <button type="submit" disabled={isSubmitting || !googleEmailInput.trim()}>
                        {isSubmitting ? "..." : "Connect"}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="auth-separator">
                <span>or mobile / email</span>
              </div>

              {/* Direct Form */}
              <form onSubmit={handleDirectSubmit} className="direct-auth-form">
                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Mobile number or Email address"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !identifier.trim()}
                  className="btn-submit-direct"
                >
                  <span>{isSubmitting ? "Connecting..." : "Continue"}</span>
                  <ArrowRight size={14} />
                </button>
              </form>

              {/* Voluntary Guest Bypass */}
              <button
                type="button"
                onClick={handleContinueAsGuest}
                className="btn-guest-bypass"
              >
                <span>Continue as Guest</span>
              </button>
            </div>

            {/* Privacy Note */}
            <div className="auth-footer-note">
              <ShieldCheck size={13} />
              <span>Login is optional. Your information is 100% secure.</span>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default CustomerAuthModal;
