import React, { useState, useEffect } from "react";
import { MessageSquare, Phone, Calendar, CheckCircle2, Search, ExternalLink } from "lucide-react";
import { inquiryApi } from "../../services/api";
import { SkeletonInquiries } from "../../components/common/Skeleton";
import toast from "react-hot-toast";
import "./AdminInquiries.scss";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = () => {
    setLoading(true);
    inquiryApi
      .getAll()
      .then((res) => {
        if (res.success && res.data) {
          setInquiries(res.data);
        }
      })
      .catch((err) => console.error("Error loading inquiries:", err))
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await inquiryApi.updateStatus(id, { status: newStatus });
      if (res.success) {
        toast.success(`Inquiry marked as ${newStatus}`);
        fetchInquiries();
      }
    } catch (err) {
      toast.error("Failed to update inquiry status");
    }
  };

  const filteredInquiries = inquiries.filter(
    (i) =>
      i.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      i.customerPhone?.includes(search) ||
      i.inquiryType?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-inquiries-page">
      {/* Header */}
      <div className="page-header-bar">
        <h1 className="page-title">Bulk & Wedding Inquiries</h1>
        <p className="page-subtitle">
          Inquiries from event coordinators, wedding couples, and wholesale export clients.
        </p>
      </div>

      {/* Search */}
      <div className="search-action-bar">
        <div className="search-input-wrapper">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by customer name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 500 }}>
          <strong style={{ color: "var(--text-main)" }}>{filteredInquiries.length}</strong> inquiries logged
        </div>
      </div>

      {/* List */}
      <div className="inquiries-list">
        {loading ? (
          <SkeletonInquiries count={4} />
        ) : filteredInquiries.length === 0 ? (
          <div style={{
            backgroundColor: "var(--bg-card)",
            padding: "48px",
            borderRadius: "var(--border-radius)",
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            border: "1px solid var(--border-main)"
          }}>
            No inquiries logged yet.
          </div>
        ) : (
          filteredInquiries.map((inq) => {
            const cleanPhone = String(inq.customerPhone || "").replace(/\D/g, "");
            const whatsappUrl = `https://wa.me/91${cleanPhone}?text=Hello%20${encodeURIComponent(
              inq.customerName || "Customer"
            )},%20this%20is%20Mavtar%20Impex%20regarding%20your%20inquiry%20for%20custom%20linen%20bags.`;

            return (
              <div key={inq.id} className="inquiry-card">
                <div className="card-header-row">
                  <div>
                    <span className="type-badge">{inq.inquiryType}</span>
                    <h3 className="customer-name">{inq.customerName}</h3>
                  </div>

                  <div className="actions-cell">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="NEW">NEW</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="QUOTED">QUOTED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="whatsapp-btn"
                    >
                      <Phone size={14} />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>

                <div className="info-pills-row">
                  <div className="info-col">
                    <span className="label">Phone</span>
                    <span className="value">{inq.customerPhone}</span>
                  </div>
                  <div className="info-col">
                    <span className="label">Quantity Requested</span>
                    <span className="value" style={{ color: "var(--accent)" }}>{inq.quantityNeeded} Bags</span>
                  </div>
                  <div className="info-col">
                    <span className="label">Custom Monogram</span>
                    <span className="value">{inq.customEmbroideryText || "Standard Motifs"}</span>
                  </div>
                </div>

                <div className="message-box">
                  <span className="msg-label">Customer Message</span>
                  <p className="msg-content">{inq.message || "No notes provided."}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;