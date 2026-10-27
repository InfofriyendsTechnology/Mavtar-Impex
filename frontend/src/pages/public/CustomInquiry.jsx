import React, { useState } from "react";
import { MessageSquare, Phone, CheckCircle2, Sparkles, Send } from "lucide-react";
import { inquiryApi } from "../../services/api";
import toast from "react-hot-toast";
import "./CustomInquiry.scss";

const CustomInquiry = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    inquiryType: "WEDDING_RETURN_GIFTS",
    quantityNeeded: 50,
    customEmbroideryText: "",
    targetEventDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone || !formData.message) {
      toast.error("Fill required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await inquiryApi.create(formData);
      if (res.success) {
        setSubmitted(true);
        toast.success("Inquiry sent");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Inquiry failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-inquiry-page animate-fadeIn">
      
      {/* Page Header */}
      <div className="inquiry-header">
        <span className="inquiry-badge">
          ✦ Bespoke & Bulk Orders
        </span>
        <h1 className="inquiry-title">Custom & Bulk Gifting</h1>
        <p className="inquiry-desc">
          Personalized embroidered linen bags with custom monograms, wedding crests, or corporate branding. Direct from our Surat looms.
        </p>
      </div>

      <div className="inquiry-grid">
        
        {/* Left: Atelier Perks Card */}
        <div className="atelier-info-card">
          <h3 className="card-title">Why Partner With Mavtar Impex?</h3>

          <div className="perks-list">
            <div className="perk-item">
              <div className="perk-icon-wrap">
                <Sparkles style={{ width: 15, height: 15 }} />
              </div>
              <div className="perk-text">
                <strong>Bespoke Monograms & Custom Crests</strong>
                <span>Digitized vector embroidery of wedding monograms, initials, or corporate branding.</span>
              </div>
            </div>

            <div className="perk-item">
              <div className="perk-icon-wrap">
                <CheckCircle2 style={{ width: 15, height: 15 }} />
              </div>
              <div className="perk-text">
                <strong>Direct Looms Wholesale Pricing</strong>
                <span>Substantial tiered discounts for wedding planners, retailers, and corporate gifting houses.</span>
              </div>
            </div>

            <div className="perk-item">
              <div className="perk-icon-wrap">
                <CheckCircle2 style={{ width: 15, height: 15 }} />
              </div>
              <div className="perk-text">
                <strong>Pan-India & Global Doorstep Dispatch</strong>
                <span>Insured air and express road transport with export-grade water-resistant cartons.</span>
              </div>
            </div>
          </div>

          <div className="whatsapp-direct-box">
            <span className="direct-label">Need Instant Sample Video?</span>
            <a
              href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20want%20to%20inquire%20about%20bulk%20bags"
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp-direct"
            >
              <Phone style={{ width: 14, height: 14 }} />
              <span>Direct WhatsApp Hotline (+91 95127 53471)</span>
            </a>
          </div>
        </div>

        {/* Right: Form Card */}
        <div className="inquiry-form-card">
          {submitted ? (
            <div className="submitted-success-box animate-fadeIn">
              <div className="success-circle">
                <CheckCircle2 style={{ width: 28, height: 28 }} />
              </div>
              <h3 className="success-heading">Inquiry Received</h3>
              <p className="success-msg">
                Thank you! Our master craft coordinator in Surat will review your requirements and reach out via WhatsApp / phone within 4 business hours with swatch samples.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-reset-inquiry"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="fields-stack">
              <h3 className="form-title">Custom Order Request</h3>

              <div className="row-2col">
                <div className="field-group">
                  <label>
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarti Mehta"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div>

                <div className="field-group">
                  <label>
                    Mobile Number <span className="req">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value.replace(/\D/g, "") })}
                  />
                </div>
              </div>

              <div className="row-2col">
                <div className="field-group">
                  <label>Inquiry Type</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  >
                    <option value="WEDDING_RETURN_GIFTS">Wedding Return Favors</option>
                    <option value="CORPORATE_GIFTING">Corporate Hampers & Events</option>
                    <option value="BULK_EXPORT">Wholesale Export Order</option>
                    <option value="CUSTOM_BOUTIQUE">Boutique Custom Collection</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Estimated Quantity Needed</label>
                  <input
                    type="number"
                    min="20"
                    step="10"
                    value={formData.quantityNeeded}
                    onChange={(e) => setFormData({ ...formData, quantityNeeded: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="field-group">
                <label>Custom Monogram / Couple Initials (if any)</label>
                <input
                  type="text"
                  placeholder="e.g. 'A & R' or company name / logo"
                  value={formData.customEmbroideryText}
                  onChange={(e) => setFormData({ ...formData, customEmbroideryText: e.target.value })}
                />
              </div>

              <div className="field-group">
                <label>
                  Specific Event Requirements & Theme Notes <span className="req">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your event theme, color palette preference (e.g. charcoal grey, beige linen), delivery timeline, etc."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-submit-inquiry"
              >
                <Send style={{ width: 16, height: 16 }} />
                <span>{loading ? "Submitting..." : "Send Custom Inquiry"}</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};

export default CustomInquiry;