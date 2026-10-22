import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, RefreshCw, Truck, Heart, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-linen-200 border-t border-gold-500/20 pt-16 pb-10">
      
      {/* Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-emerald-900/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2 p-3">
            <div className="w-12 h-12 rounded-full bg-emerald-900/80 flex items-center justify-center text-gold-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-linen-100">Artisanal Zari Embroidery</h4>
            <p className="text-xs text-linen-400">Precision multi-head machine stitching with velvet applique</p>
          </div>

          <div className="flex flex-col items-center space-y-2 p-3">
            <div className="w-12 h-12 rounded-full bg-emerald-900/80 flex items-center justify-center text-gold-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-linen-100">100% Pure Flax Linen</h4>
            <p className="text-xs text-linen-400">Heavy-GSM organic linen with reinforced double-handle drop</p>
          </div>

          <div className="flex flex-col items-center space-y-2 p-3">
            <div className="w-12 h-12 rounded-full bg-emerald-900/80 flex items-center justify-center text-gold-400">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-linen-100">Pan-India Express Shipping</h4>
            <p className="text-xs text-linen-400">Free delivery on orders above ₹999 across all pincodes</p>
          </div>

          <div className="flex flex-col items-center space-y-2 p-3">
            <div className="w-12 h-12 rounded-full bg-emerald-900/80 flex items-center justify-center text-gold-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-base font-bold text-linen-100">Custom Bulk & Gifting</h4>
            <p className="text-xs text-linen-400">Custom monograms & wholesale export for weddings and corporate</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Intro */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-serif font-bold text-white tracking-wide">
                MAVTAR IMPEX
              </span>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold-400 font-semibold mt-0.5">
                Artisanal Linen & Royal Embroidery
              </div>
            </Link>
            <p className="text-xs text-linen-300 leading-relaxed max-w-sm">
              Mavtar Impex crafts sustainable luxury linen tote bags, evening potlis, and handcrafted travel duffels embellished with royal Indian zari and resham threadwork. Handcrafted with reverence in Surat, Gujarat.
            </p>
            <div className="pt-2 text-xs text-linen-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Textile City, Surat, Gujarat, India - 395006</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+91 95127 53471 / Surat Office</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>contact@mavtarimpex.com</span>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold-300 tracking-wider uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-linen-300">
              <li>
                <Link to="/shop?category=royal-heritage" className="hover:text-gold-400 transition-colors">
                  Royal Haathi Collection
                </Link>
              </li>
              <li>
                <Link to="/shop?category=everyday-minimal" className="hover:text-gold-400 transition-colors">
                  Everyday Minimal Linen
                </Link>
              </li>
              <li>
                <Link to="/shop?category=festive-gifting" className="hover:text-gold-400 transition-colors">
                  Festive Evening Potlis
                </Link>
              </li>
              <li>
                <Link to="/shop?category=potlis-clutches" className="hover:text-gold-400 transition-colors">
                  Antique Zari Clutches
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-gold-400 transition-colors">
                  View All Bags (₹600 - ₹2,000)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold-300 tracking-wider uppercase mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-linen-300">
              <li>
                <Link to="/track" className="hover:text-gold-400 transition-colors">
                  Live Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/craftsmanship" className="hover:text-gold-400 transition-colors">
                  Our Embroidery Craft
                </Link>
              </li>
              <li>
                <Link to="/bulk-inquiry" className="hover:text-gold-400 transition-colors">
                  Wedding & Bulk Inquiries
                </Link>
              </li>
              <li>
                <a href="https://wa.me/919512753471" target="_blank" rel="noreferrer" className="hover:text-gold-400 transition-colors">
                  WhatsApp Support
                </a>
              </li>
              <li>
                <Link to="/craftsmanship" className="hover:text-gold-400 transition-colors">
                  Linen Care & Preservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold-300 tracking-wider uppercase mb-4">
              Exclusive Previews
            </h4>
            <p className="text-xs text-linen-400 mb-3 leading-relaxed">
              Subscribe to receive private invitations to limited artisan drops and bridal hamper specials.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to Mavtar Impex!"); }} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full bg-emerald-900/60 border border-emerald-800 rounded px-3 py-2 text-xs text-linen-100 placeholder-linen-500 focus:outline-none focus:border-gold-500"
              />
              <button
                type="submit"
                className="w-full bg-gold-500 hover:bg-gold-600 text-emerald-950 font-semibold text-xs py-2 rounded transition-colors"
              >
                Join the Circle
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-linen-400 gap-4">
          <p>© {new Date().getFullYear()} Mavtar Impex. All rights reserved. Handcrafted in India.</p>
          <div className="flex items-center gap-1 text-gold-400">
            <span>Handmade with</span>
            <Heart className="w-3.5 h-3.5 fill-ruby-600 text-ruby-600" />
            <span>in Surat, Gujarat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
