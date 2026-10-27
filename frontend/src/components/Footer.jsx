import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import "./Footer.scss";

const Footer = () => {
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

          {/* Newsletter */}
          <div className="footer-newsletter-col">
            <div className="col-heading">Exclusive Updates</div>
            <p>Join our private circle for limited edition drops and bridal gifting previews.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
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
    </footer>
  );
};

export default Footer;
