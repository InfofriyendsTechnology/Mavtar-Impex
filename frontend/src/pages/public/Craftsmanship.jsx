import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Layers, Cpu, ShieldCheck, CheckCircle2 } from "lucide-react";
import "./Craftsmanship.scss";

const Craftsmanship = () => {
  const PROCESS_STAGES = [
    {
      step: "01",
      icon: <Layers size={22} />,
      title: "Raw Flax Sourcing",
      subtitle: "100% Natural Belgian Flax",
      desc: "Carefully selected heavy-GSM pure flax linen that offers superior tensile strength, natural fiber texture, and heirloom breathability.",
      img: "/products/process-01.png",
      metric: "450+ GSM Heavyweight Weave",
    },
    {
      step: "02",
      icon: <Cpu size={22} />,
      title: "Vector Digitization",
      subtitle: "Multi-Head Computerized Embroidery",
      desc: "Our Surat designers digitize royal ceremonial elephant and peacock motifs, ensuring millimeter-precise multi-needle threadwork.",
      img: "/products/process-02.png",
      metric: "28,000+ High-Density Stitches",
    },
    {
      step: "03",
      icon: <Sparkles size={22} />,
      title: "Zari & Velvet Applique",
      subtitle: "Metallic Cord & Raised Relief",
      desc: "Artisans hand-guide imported gold and silver bullion threads over plush velvet cutouts to create unmistakable royal texture.",
      img: "/products/process-03.png",
      metric: "Zero Pucker Tactile Relief",
    },
    {
      step: "04",
      icon: <ShieldCheck size={22} />,
      title: "Master Tailoring",
      subtitle: "Load-Bearing Dual Handle Seams",
      desc: "Double-stitched boxed gussets, water-resistant cotton lining, and reinforced load-bearing handles tested to hold up to 10kg.",
      img: "/products/process-04.png",
      metric: "10kg Load-Tested Guarantee",
    },
  ];

  return (
    <div className="craftsmanship-page animate-fadeIn">
      
      {/* 1. Hero Section */}
      <section className="craft-hero-section">
        <span className="craft-tag">Surat Atelier Looms</span>
        <h1>The Craft of Linen & Thread</h1>
        <p>
          How Mavtar Impex pairs dense organic flax linen with computerized embroidery and traditional Gujarati needlework to create heirloom carryalls.
        </p>
      </section>

      {/* 2. Editorial Showcase Frame (Clean Natural Containment - No Over-Zoom) */}
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
                <div className="step-metric-chip">
                  <CheckCircle2 size={13} />
                  <span>{item.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Comprehensive Artisanal Process Benchmark Table */}
      <section className="process-table-section">
        <div className="section-title-wrap">
          <span className="sub-title">Technical Specifications</span>
          <h2>Artisanal Process Matrix</h2>
          <p>Standardized quality benchmarks adhered to at our Surat manufacturing facility.</p>
        </div>

        <div className="table-responsive-wrapper">
          <table className="process-matrix-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>Craftsmanship Phase</th>
                <th>Technique & Machinery</th>
                <th>Material Specification</th>
                <th>Quality Benchmark</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="badge-stage">Phase 01</span></td>
                <td><strong>Linen Weaving & Prep</strong></td>
                <td>High-density air-jet looms</td>
                <td>100% Unbleached Belgian Flax</td>
                <td>450+ GSM certified weight</td>
              </tr>
              <tr>
                <td><span className="badge-stage">Phase 02</span></td>
                <td><strong>Motif Digitization</strong></td>
                <td>Multi-head high-precision embroidery</td>
                <td>Resham silk & metallic threads</td>
                <td>28,000+ stitches per motif</td>
              </tr>
              <tr>
                <td><span className="badge-stage">Phase 03</span></td>
                <td><strong>Zari & Velvet Applique</strong></td>
                <td>Hand-framed zardozi needlework</td>
                <td>Lustrous micro-sequins & velvet</td>
                <td>Zero thread slippage / snag test</td>
              </tr>
              <tr>
                <td><span className="badge-stage">Phase 04</span></td>
                <td><strong>Tailoring & QC</strong></td>
                <td>Heavy-duty computerized lockstitch</td>
                <td>Water-resistant khadi cotton lining</td>
                <td>10 kg load stress verified</td>
              </tr>
            </tbody>
          </table>
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