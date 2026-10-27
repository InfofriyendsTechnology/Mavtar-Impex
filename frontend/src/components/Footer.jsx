import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Sparkles, CheckCircle2, X, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { inquiryApi } from "../services/api";
import "./Footer.scss";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Valid email required");
      return;
    }

    setIsSubmitting(true);
    const enteredEmail = email.trim();
    try {
      await inquiryApi.create({
        customerName: "Newsletter Patron",
        customerEmail: enteredEmail,
        customerPhone: "0000000000",
        inquiryType: "NEWSLETTER_SUBSCRIBE",
        message: `Newsletter Patron Subscription for: ${enteredEmail}`,
      }).catch(() => {});
    } finally {
      setIsSubmitting(false);
      setSubscribedEmail(enteredEmail);
      setEmail("");
      setShowModal(true);
      toast.success("Subscribed");
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner-container">
        
        {/* Main Footer Links */}
        <div className="footer-main-columns">
          
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="brand-title">MAVTAR IMPEX</div>
              <div className="brand-meta">Artisanal Linen & Royal Embroidery</div>
            </Link>
            <p className="brand-summary">
              Mavtar Impex crafts sustainable luxury linen tote bags embellished with royal Indian zari and resham threadwork. Handcrafted with reverence in Surat, Gujarat.
            </p>
            <div className="brand-contact-list">
              <div className="contact-row">
                <MapPin size={14} />
                <span>Textile City, Surat, Gujarat, India - 395006</span>
              </div>
              <div className="contact-row">
                <Phone size={14} />
                <span>+91 95127 53471</span>
              </div>
              <div className="contact-row">
                <Mail size={14} />
                <span>contact@mavtarimpex.com</span>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div className="footer-nav-col">
            <div className="col-heading">Collections</div>
            <ul>
              <li><Link to="/shop?category=royal-heritage">Royal Haathi</Link></li>
              <li><Link to="/shop?category=everyday-minimal">Everyday Minimal</Link></li>
              <li><Link to="/shop?category=festive-gifting">Festive Keepsakes</Link></li>
              <li><Link to="/shop">View All Bags</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="footer-nav-col">
            <div className="col-heading">Customer Care</div>
            <ul>
              <li><Link to="/track">Order Tracking</Link></li>
              <li><Link to="/craftsmanship">The Craft</Link></li>
              <li><Link to="/bulk-inquiry">Custom Inquiries</Link></li>
              <li><a href="https://wa.me/919512753471" target="_blank" rel="noreferrer">WhatsApp Concierge</a></li>
              <li><a href="https://www.instagram.com/mavtar_impex/" target="_blank" rel="noreferrer">Instagram (@mavtar_impex)</a></li>
            </ul>
          </div>

          {/* Newsletter / Exclusive Circle */}
          <div className="footer-newsletter-col">
            <div className="col-heading">Exclusive Updates</div>
            <p>Join our private circle for limited edition drops and bridal gifting previews.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-row">
          <p>© {new Date().getFullYear()} Mavtar Impex. All rights reserved. Handcrafted in India.</p>
          <div className="heart-phrase">
            <span>Handmade with ♥ in Surat, Gujarat</span>
          </div>
        </div>

      </div>

      {/* Workable Luxury Newsletter Modal */}
      {showModal && (
        <div className="subscribe-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="subscribe-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="modal-icon-wrap">
              <Sparkles size={24} />
            </div>

            <span className="modal-tag">Private Patron Circle</span>
            <h2>Welcome to Mavtar Impex</h2>
            <p className="modal-subtitle">
              Thank you for subscribing with <strong>{subscribedEmail}</strong>.
            </p>

            <div className="modal-perks-list">
              <div className="perk-row">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>Priority preview access to ceremonial embroidery drops.</span>
              </div>
              <div className="perk-row">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>Direct wholesale pricing on bespoke wedding return hampers.</span>
              </div>
              <div className="perk-row">
                <CheckCircle2 size={16} className="perk-icon" />
                <span>Complimentary monogram crest vector digitizing.</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-modal-action"
              onClick={() => setShowModal(false)}
            >
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
