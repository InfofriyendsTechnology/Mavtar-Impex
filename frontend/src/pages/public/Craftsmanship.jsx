import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Layers, Cpu, ShieldCheck, CheckCircle2 } from "lucide-react";
import "./Craftsmanship.scss";

const Craftsmanship = () => {
  const PROCESS_STAGES = [
    {
      step: "01",
      icon: <Layers size={18} />,
      title: "Raw Flax Sourcing",
      subtitle: "100% Belgian Flax",
      desc: "Carefully selected heavy-GSM pure flax linen woven on high-density air-jet looms for natural texture and strength.",
      img: "/products/process-01.png",
      specs: [
        { label: "Material", val: "100% Flax" },
        { label: "Density", val: "450+ GSM" }
      ],
      metric: "450+ GSM Weave",
    },
    {
      step: "02",
      icon: <Cpu size={18} />,
      title: "Vector Digitization",
      subtitle: "Surat Embroidery",
      desc: "Our Surat designers digitize royal elephant and peacock motifs, ensuring millimeter-precise multi-needle threadwork.",
      img: "/products/process-02.png",
      specs: [
        { label: "Needles", val: "Multi-Head" },
        { label: "Count", val: "28k+ Stitches" }
      ],
      metric: "28,000+ Stitches",
    },
    {
      step: "03",
      icon: <Sparkles size={18} />,
      title: "Zari & Velvet Applique",
      subtitle: "Bullion Relief",
      desc: "Artisans hand-guide metallic gold and silver threads over plush velvet cutouts to create an unmistakable royal relief.",
      img: "/products/process-03.png",
      specs: [
        { label: "Craft", val: "Hand Zardozi" },
        { label: "QC", val: "Zero Snag" }
      ],
      metric: "Zero-Snag Tactile",
    },
    {
      step: "04",
      icon: <ShieldCheck size={18} />,
      title: "Master Tailoring",
      subtitle: "Reinforced Seams",
      desc: "Double-stitched boxed gussets, water-resistant cotton lining, and load-bearing handles tested to hold up to 10kg.",
      img: "/products/process-04.png",
      specs: [
        { label: "Stitch", val: "Dual Box Seam" },
        { label: "Stress", val: "10kg Tested" }
      ],
      metric: "10kg Load Tested",
    },
  ];

  const QUALITY_BENCHMARKS = [
    { num: "450+", unit: "GSM", title: "Flax Linen Density", desc: "Dense unbleached heavyweight natural weave" },
    { num: "28k+", unit: "Stitches", title: "Embroidery Precision", desc: "High-density multi-head vector needlework" },
    { num: "10 kg", unit: "Capacity", title: "Load Stress Verified", desc: "Dual reinforced seams tested for heavy carrying" },
    { num: "100%", unit: "Inspected", title: "Surat Atelier QC", desc: "Every piece hand-examined before dispatch" },
  ];

  return (
    <div className="craftsmanship-page animate-fadeIn">
      
      {/* 1. Hero Section */}
      <section className="craft-hero-section">
        <span className="craft-tag">✦ Surat Atelier Looms</span>
        <h1>The Craft of Linen & Thread</h1>
        <p>
          How Mavtar Impex pairs dense organic flax linen with computerized embroidery and traditional Gujarati needlework to create heirloom carryalls.
        </p>
      </section>

      {/* 2. Editorial Showcase Frame (Clean Natural Containment) */}
      <div className="craft-showcase-frame">
        <img
          src="/products/craft-banner-wide.png"
          alt="Mavtar Impex Handcrafted Royal Zari Linen Bag"
          onError={(e) => {
            e.target.src = "/Banner.png";
          }}
        />
      </div>

      {/* 3. Four-Stage Process Showcase Cards */}
      <section className="craft-stages-section">
        <div className="section-title-wrap">
          <span className="sub-title">Step-by-Step Excellence</span>
          <h2>Our Production Process</h2>
          <p>Every handcrafted tote passes through four rigorous artisanal stages in Surat.</p>
        </div>

        <div className="craft-steps-grid">
          {PROCESS_STAGES.map((item, idx) => (
            <div key={idx} className="step-card">
              <div className="step-media-container">
                <img
                  src={item.img}
                  alt={item.title}
                  className="step-img"
                  onError={(e) => {
                    e.target.src = `/products/Bag00${idx + 1}.png`;
                  }}
                />
                <div className="step-badge-circle">{item.step}</div>
              </div>

              <div className="step-body">
                <div className="step-icon-row">
                  <div className="step-icon-box">{item.icon}</div>
                  <span className="step-sub">{item.subtitle}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>

                <div className="step-specs-row">
                  {item.specs.map((sp, sIdx) => (
                    <span key={sIdx} className="step-spec-pill">
                      <strong>{sp.label}:</strong> {sp.val}
                    </span>
                  ))}
                </div>

                <div className="step-metric-chip">
                  <CheckCircle2 size={13} />
                  <span>{item.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Atelier Quality Benchmarks (Replacing bulky unresponsive table with sleek responsive cards) */}
      <section className="craft-benchmarks-section">
        <div className="section-title-wrap">
          <span className="sub-title">Sensible Engineering</span>
          <h2>Quality Benchmarks</h2>
          <p>Standardized quality standards tested and adhered to at our Surat facility.</p>
        </div>

        <div className="benchmarks-grid">
          {QUALITY_BENCHMARKS.map((b, i) => (
            <div key={i} className="benchmark-card">
              <div className="bench-number-wrap">
                <span className="bench-num">{b.num}</span>
                <span className="bench-unit">{b.unit}</span>
              </div>
              <h4 className="bench-title">{b.title}</h4>
              <p className="bench-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Gifting & Bulk Order CTA */}
      <div className="craft-cta-box">
        <h2>Experience Heirloom Craftsmanship</h2>
        <p>Browse our ready collection or commission custom monogrammed bags for weddings & corporate gifting.</p>
        <div className="cta-actions">
          <Link to="/shop" className="btn-shop-collection">
            <span>Explore Collection</span>
            <ArrowRight size={14} />
          </Link>
          <Link to="/bulk-inquiry" className="btn-bulk-custom">
            <span>Custom Bulk Inquiries</span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Craftsmanship;
