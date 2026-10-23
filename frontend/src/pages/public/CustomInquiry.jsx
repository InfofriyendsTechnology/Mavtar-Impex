import React, { useState } from "react";
import { MessageSquare, Phone, Mail, CheckCircle2, Sparkles, Send } from "lucide-react";
import { inquiryApi } from "../../services/api";
import toast from "react-hot-toast";

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
      toast.error("Please fill in your name, phone number, and message");
      return;
    }

    setLoading(true);
    try {
      const res = await inquiryApi.create(formData);
      if (res.success) {
        setSubmitted(true);
        toast.success("Inquiry submitted successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit inquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold tracking-widest text-gold-600 uppercase">
          Weddings • Corporate Hampers • Global Export
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-950">
          Custom & Bulk Gifting Orders
        </h1>
        <p className="text-sm text-linen-600 font-light">
          We craft customized embroidered linen bags with your family monogram, wedding initials, or corporate branding. Manufactured with speed in Surat, Gujarat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Info Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-950 text-linen-100 p-8 rounded-2xl border border-gold-500/30 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">
              Why Partner with Mavtar Impex?
            </h3>

            <div className="space-y-4 text-xs text-linen-300">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Bespoke Monograms</strong>
                  Custom embroidery digitizing of couple initials, wedding logos, or corporate crests.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Tiered Wholesale Pricing</strong>
                  Substantial volume discounts for wedding planners, event organizers, and boutique retailers.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-medium">Pan-India & International Export</strong>
                  Air & sea freight logistics ready with export-grade water-resistant carton packing.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900 space-y-2 text-xs">
              <p className="text-gold-400 font-bold uppercase tracking-wider">Direct WhatsApp Inquiry</p>
              <a
                href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20want%20to%20inquire%20about%20bulk%20bags"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-gold-200 px-4 py-2.5 rounded-lg font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-zinc-400" />
                <span>Chat on WhatsApp (+91 95127 53471)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-linen-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 text-zinc-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-zinc-950">Inquiry Received</h3>
                <p className="text-xs text-linen-600 max-w-md mx-auto">
                  Thank you! Our master craft coordinator will review your requirements and reach out via WhatsApp / phone within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-zinc-900 text-gold-200 px-6 py-2 rounded text-xs font-semibold"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-zinc-950 border-b border-linen-100 pb-3">
                  Inquiry Form
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-linen-800 mb-1">
                      Your Name <span className="text-ruby-700">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarti Mehta"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-linen-800 mb-1">
                      Mobile Number <span className="text-ruby-700">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value.replace(/\D/g, "") })}
                      className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-linen-800 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500 cursor-pointer"
                    >
                      <option value="WEDDING_RETURN_GIFTS">Wedding Return Favors</option>
                      <option value="CORPORATE_GIFTING">Corporate Hampers & Events</option>
                      <option value="BULK_EXPORT">Wholesale Export Order</option>
                      <option value="CUSTOM_BOUTIQUE">Boutique Custom Collection</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-linen-800 mb-1">
                      Estimated Quantity Needed
                    </label>
                    <input
                      type="number"
                      min="20"
                      step="10"
                      value={formData.quantityNeeded}
                      onChange={(e) => setFormData({ ...formData, quantityNeeded: Number(e.target.value) })}
                      className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-linen-800 mb-1">
                    Custom Monogram / Initials (if any)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 'A & R' or company name"
                    value={formData.customEmbroideryText}
                    onChange={(e) => setFormData({ ...formData, customEmbroideryText: e.target.value })}
                    className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-linen-800 mb-1">
                    Specific Requirements or Event Notes <span className="text-ruby-700">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your event theme, color palette preference (e.g. charcoal grey, beige linen), delivery timeline, etc."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-gold-200 py-3 rounded-md font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Submitting..." : "Submit Inquiry"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default CustomInquiry;
