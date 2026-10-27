import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PhoneCall, Sparkles, Shield, Layers, Star, CheckCircle2, Quote } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard";
import { productApi } from "../../services/api";
import bannerImg from "../../assets/Banner.png";
import "./Home.scss";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi
      .getAll({ sort: "popular" })
      .then((res) => {
        if (res.success && res.data) {
          setFeaturedProducts(res.data.slice(0, 4));
        }
      })
      .catch((err) => console.error("Error loading products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      
      {/* =========================================================================
          1. CREATIVE LUXURY HERO + INTEGRATED MARQUEE (Zero White Gap)
         ========================================================================= */}
      <div className="home-hero-wrapper">
        <div className="hero-glow-amber" />
        <div className="hero-glow-zinc" />
        <div className="hero-watermark">MAVTAR</div>

        <section className="hero-content-container">
          
          {/* Left Hero Column */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-left"
          >
            <div className="hero-tag">
              <Sparkles size={11} />
              <span>Pure Belgian Flax</span>
            </div>

            <h1 className="hero-heading">
              Woven Linen. <br />
              <span className="hero-italic-slate">Sculpted</span> Precision.
            </h1>

            <p className="hero-lead">
              Structured heavy-gsm natural flax carryalls, embellished with high-density zari embroidery. Built for everyday elegance and royal celebrations.
            </p>

            {/* Spec Strip */}
            <div className="hero-spec-strip">
              <div className="spec-item">
                <span className="spec-number">450+</span>
                <span className="spec-label">GSM Pure Flax</span>
              </div>
              <div className="spec-item">
                <span className="spec-number gold">28,000+</span>
                <span className="spec-label">Zari Stitches</span>
              </div>
              <div className="spec-item">
                <span className="spec-number">10 kg</span>
                <span className="spec-label">Reinforced</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-cta-group">
              <Link to="/shop" className="btn-hero-primary">
                <span>Shop Collection</span>
                <ArrowRight size={15} />
              </Link>

              <Link to="/bulk-inquiry" className="btn-hero-secondary">
                <span>Custom Orders</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Hero Product Card - Clean Luxury Presentation */}
          <div className="hero-right">
            <div className="hero-clean-card">
              <div className="card-top-pill">
                <Sparkles size={12} />
                <span>Handcrafted in Surat • Belgian Flax</span>
              </div>

              <div className="card-image-box">
                <img
                  src={bannerImg || "/Banner.png"}
                  alt="Mavtar Impex Handcrafted Royal Zari Linen Bag"
                  className="hero-main-img"
                  onError={(e) => {
                    e.target.src = "/products/Bag001.png";
                  }}
                />
              </div>

              <div className="card-bottom-bar">
                <div className="bag-info">
                  <span className="bag-tag">Flagship Edition</span>
                  <h3 className="bag-name">The Royal Haathi Heritage Tote</h3>
                  <div className="bag-pricing">
                    <span className="current-price">₹1,499</span>
                    <span className="original-price">₹2,299</span>
                    <span className="save-badge">Save 35%</span>
                  </div>
                </div>

                <Link to="/shop" className="btn-explore-pill">
                  <span>Explore</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

        </section>

        {/* Marquee Ticker (Flush inside Hero - Zero Gap) */}
        <div className="hero-marquee-ribbon">
          <div className="marquee-track">
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="marquee-item-group">
                <span className="highlight">Natural Belgian Flax Linen</span>
                <span className="diamond">✦</span>
                <span>28,000+ Precision Computerized Stitches</span>
                <span className="diamond">✦</span>
                <span className="highlight">Surat Artisan Atelier</span>
                <span className="diamond">✦</span>
                <span>100% Plastic-Free & Sustainable</span>
                <span className="diamond">✦</span>
                <span className="highlight">Custom Wedding & Corporate Gifting</span>
                <span className="diamond">✦</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* =========================================================================
          2. CURATED COLLECTIONS
         ========================================================================= */}
      <section className="home-section-container">
        
        <div className="section-header-flex">
          <div>
            <span className="header-meta">Curated Series</span>
            <h2 className="header-title">Explore Collections</h2>
          </div>
          <Link to="/shop" className="header-link">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="collections-grid">
          {[
            {
              title: "Royal Heritage",
              desc: "Traditional Indian motifs & gold zari",
              price: "From ₹1,399",
              img: "/products/Bag001.png",
              slug: "royal-heritage",
            },
            {
              title: "Everyday Minimal",
              desc: "Clean silhouettes in earth tones",
              price: "From ₹1,299",
              img: "/products/Bag005.png",
              slug: "everyday-minimal",
            },
            {
              title: "Festive & Wedding",
              desc: "Celebratory keepsakes & gifting",
              price: "From ₹1,499",
              img: "/products/Bag004.png",
              slug: "festive-gifting",
            },
            {
              title: "Imperial Crest",
              desc: "Intricate peacock & floral work",
              price: "From ₹1,599",
              img: "/products/Bag010.png",
              slug: "royal-heritage",
            },
          ].map((cat, idx) => (
            <Link key={idx} to={`/shop?category=${cat.slug}`} className="collection-item-card">
              <div className="card-media-wrapper">
                <img
                  src={cat.img}
                  alt={cat.title}
                  onError={(e) => {
                    e.target.src = "/products/Bag001.png";
                  }}
                />
                <div className="media-hover-pill">
                  <span>
                    Explore Collection
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>

              <div className="card-meta-text">
                <h3 className="cat-title">{cat.title}</h3>
                <p className="cat-desc">{cat.desc}</p>
                <p className="cat-price">{cat.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. BEST SELLERS CATALOG
         ========================================================================= */}
      <section className="home-section-container">
        
        <div className="section-header-flex">
          <div>
            <span className="header-meta">Handcrafted in Surat</span>
            <h2 className="header-title">Best Sellers</h2>
          </div>
          <Link to="/shop" className="header-link">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="products-grid-catalog">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="products-grid-catalog"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </section>

      {/* =========================================================================
          4. THE CRAFT SPOTLIGHT
         ========================================================================= */}
      <section id="craftsmanship-spotlight" className="craft-spotlight-wrapper">
        <div className="craft-layout-grid">
          
          <div className="craft-visual-card">
            <img
              src="https://res.cloudinary.com/pbnqazpy/image/upload/v1793090926/mavtar/products/Bag001.webp"
              alt="Embroidered Linen Tote Bag"
              onError={(e) => {
                e.target.src = "/products/Bag001.png";
              }}
            />
          </div>

          <div className="craft-details-column">
            <span className="craft-badge-meta">The Craft</span>

            <h2 className="craft-main-title">
              Thoughtfully Designed, <br />
              <span className="gold-accent">Built</span> to Last.
            </h2>

            <p className="craft-lead-p">
              Every Mavtar Impex tote is handcrafted in our Surat facility using heavyweight natural flax linen. Combining traditional embroidery techniques with modern precision, each piece is durable, sustainable, and made for everyday living.
            </p>

            <div className="craft-pillars-list">
              {[
                {
                  icon: <Layers size={16} />,
                  title: "Natural Flax Linen",
                  desc: "Pure, breathable fiber that softens naturally with use while retaining high tensile strength.",
                },
                {
                  icon: <Sparkles size={16} />,
                  title: "Precision Threadwork",
                  desc: "Dense, detailed embroidery designed to stay vibrant and intact over time.",
                },
                {
                  icon: <Shield size={16} />,
                  title: "Reinforced Construction",
                  desc: "Double-stitched handles and boxed base capable of carrying heavy daily essentials.",
                },
              ].map((item, i) => (
                <div key={i} className="pillar-item">
                  <div className="pillar-icon-box">{item.icon}</div>
                  <div>
                    <h4 className="pillar-title">{item.title}</h4>
                    <p className="pillar-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="craft-action-buttons">
              <Link to="/craftsmanship" className="btn-craft-primary">
                Our Process
              </Link>
              <Link to="/bulk-inquiry" className="btn-craft-outline">
                Custom Orders
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. BESPOKE WEDDING & CORPORATE ORDERS
         ========================================================================= */}
      <section className="home-section-container">
        <div className="home-gifting-card">
          <div className="gifting-inner-grid">
            
            <div className="gifting-copy-column">
              <span className="gifting-meta-tag">Bespoke & Gifting</span>

              <h2 className="gifting-heading">Weddings & Corporate Gifting</h2>

              <p className="gifting-lead-p">
                We design and manufacture customized linen tote bags with monograms, dates, or company logos. Enjoy transparent wholesale pricing, custom sizing, and reliable pan-India delivery.
              </p>

              <div className="gifting-bullets-row">
                <span className="bullet-chip">
                  <span className="bullet-dot" />
                  Custom Monograms & Logos
                </span>
                <span className="bullet-chip">
                  <span className="bullet-dot" />
                  From 50 to 5,000+ Units
                </span>
                <span className="bullet-chip">
                  <span className="bullet-dot" />
                  Worldwide Shipping
                </span>
              </div>

              <div className="gifting-buttons-group">
                <Link to="/bulk-inquiry" className="btn-quote">
                  Request a Quote
                </Link>
                
                <a
                  href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20am%20interested%20in%20custom%20bulk%20linen%20bags"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-whatsapp"
                >
                  <PhoneCall size={14} />
                  <span>WhatsApp: +91 95127 53471</span>
                </a>
              </div>
            </div>

            <div className="gifting-preview-frame">
              <img
                src={bannerImg}
                alt="Custom Wedding Gifting Linen Tote Bag"
                onError={(e) => {
                  e.target.src = "/Banner.png";
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. PATRON TESTIMONIALS
         ========================================================================= */}
      <section className="home-section-container" style={{ paddingBottom: "80px" }}>
        <div className="section-header-flex" style={{ borderBottom: "none", textAlign: "center", display: "block" }}>
          <span className="header-meta">Client Feedback</span>
          <h2 className="header-title" style={{ marginTop: "6px" }}>What Our Patrons Say</h2>
        </div>

        <div className="testimonials-grid">
          {[
            {
              quote: "The tote bags were the highlight of our wedding favors. The linen weight and embroidery quality were truly exceptional.",
              client: "Priyanshi Shah",
              location: "Mumbai",
              tag: "Bridal Gifting",
              rating: 5,
            },
            {
              quote: "Ordered 250 customized bags for our annual corporate hampers. Great finish, responsive team, and delivered right on time.",
              client: "Ankit Mehta",
              location: "Ahmedabad",
              tag: "Corporate Bulk",
              rating: 5,
            },
            {
              quote: "The fabric quality and neatness of the embroidery are wonderful. A durable, elegant bag that I use almost daily.",
              client: "Neha Singhania",
              location: "New Delhi",
              tag: "Daily Carry",
              rating: 5,
            }
          ].map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="testimonial-header-row">
                <div className="stars-strip">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="#18181B" color="#18181B" />
                  ))}
                </div>
                <div className="verified-badge">
                  <CheckCircle2 size={12} />
                  <span>Verified Patron</span>
                </div>
              </div>

              <div className="quote-wrap">
                <Quote size={18} className="quote-icon" />
                <p className="quote-body">"{t.quote}"</p>
              </div>

              <div className="client-footer">
                <div className="client-avatar">
                  {t.client.charAt(0)}
                </div>
                <div className="client-info">
                  <div className="client-name">{t.client}</div>
                  <div className="client-loc">{t.location} • <span className="client-tag">{t.tag}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
