import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Clock, MessageSquare, CheckCircle, Package } from "lucide-react";
import { orderApi } from "../../services/api";
import "./TrackOrder.scss";

const TrackOrder = () => {
  const [searchParams] = useSearchParams();
  const [identifier, setIdentifier] = useState(searchParams.get("order") || "");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const initialQuery = searchParams.get("order");
    if (initialQuery) {
      handleTrack(initialQuery);
    }
  }, [searchParams]);

  const handleTrack = async (queryToSearch) => {
    const query = queryToSearch || identifier;
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setSearched(true);

    try {
      const res = await orderApi.track(query.trim());
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setOrder(null);
        setErrorMsg("No active order found with this Order ID or Phone number.");
      }
    } catch (err) {
      setOrder(null);
      setErrorMsg("No active order found with this Order ID or Phone number. Please check the spelling or contact support.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-order-page animate-fadeIn">
      
      {/* 1. Header */}
      <div className="track-header">
        <span className="track-badge">Live Shipment Tracking</span>
        <h1 className="track-title">Track Your Handcrafted Order</h1>
        <p className="track-subtitle">
          Enter your 6-digit Order Reference (e.g. <code>MVT-849201</code>) or your 10-digit mobile number.
        </p>
      </div>

      {/* 2. Luxury Search Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTrack();
        }}
        className="track-search-card"
      >
        <div className="input-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            required
            placeholder="Order ID (e.g. MVT-849201) or 10-digit Mobile Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="search-input"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-track-submit">
          {loading ? "Tracking..." : "Track Order"}
        </button>
      </form>

      {/* 3. Order Result Container */}
      {order && (
        <div className="track-result-card animate-fadeIn">
          
          {/* Result Header */}
          <div className="result-header-row">
            <div className="header-info">
              <span className="order-meta-label">Order Reference</span>
              <h2 className="order-number-heading">{order.orderNumber}</h2>
            </div>
            <div className="status-pills">
              <span className="pill-status status-active">
                Status: {order.orderStatus || "In Production"}
              </span>
              <span className={`pill-status ${order.paymentStatus === "PAID" ? "status-payment" : "status-pending"}`}>
                Payment: {order.paymentStatus || "COD"}
              </span>
            </div>
          </div>

          {/* Stepper / Timeline */}
          <div className="stepper-section">
            <h3 className="stepper-heading">
              <Clock style={{ width: 20, height: 20 }} />
              <span>Production & Delivery Progress</span>
            </h3>

            <div className="stepper-grid">
              {order.trackingSteps?.map((step, idx) => (
                <div
                  key={idx}
                  className={`step-item ${step.completed ? "step-completed" : ""}`}
                >
                  <div className="step-number-bubble">
                    {step.completed ? "✓" : idx + 1}
                  </div>
                  <div className="step-info-col">
                    <span className="step-title">{step.title}</span>
                    {step.time && (
                      <span className="step-time">
                        {new Date(step.time).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="details-grid">
            {/* Left: Items in Shipment */}
            <div className="items-column">
              <h4 className="col-title">
                Handcrafted Bags in Shipment ({order.items?.length || 0})
              </h4>
              <div className="items-list">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="item-row">
                    <img
                      src={item.image || "/products/Bag001.png"}
                      alt={item.title}
                      className="item-thumb"
                      onError={(e) => {
                        e.target.src = "/products/Bag001.png";
                      }}
                    />
                    <div className="item-details">
                      <span className="item-name">{item.title}</span>
                      <span className="item-qty">Quantity: {item.quantity}</span>
                      <span className="item-price">₹{Number(item.price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Delivery Information */}
            <div className="delivery-column">
              <h4 className="col-title">Destination & Customer</h4>
              <div className="delivery-card">
                <span className="cust-name">{order.customerName}</span>
                <span className="cust-phone">📞 {order.customerPhone}</span>
                <span className="cust-address">
                  📍 {order.shippingAddress?.addressLine1}{order.shippingAddress?.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ""}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                </span>
                <div className="order-total-highlight">
                  <span>Grand Total Paid:</span>
                  <span>₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Support Bar */}
          <div className="support-bar">
            <span className="support-text">
              Have questions regarding dispatch or custom monogramming?
            </span>
            <a
              href="https://wa.me/919512753471?text=Hi%20Mavtar%20Impex,%20I%20have%20an%20inquiry%20about%20my%20order."
              target="_blank"
              rel="noreferrer"
              className="support-btn"
            >
              <MessageSquare style={{ width: 14, height: 14 }} />
              <span>Artisan Care Support</span>
            </a>
          </div>

        </div>
      )}

      {/* 4. Not Found / Error State */}
      {searched && !order && !loading && (
        <div className="track-not-found-card animate-fadeIn">
          <p className="error-title">{errorMsg || "No active order found."}</p>
          <p className="error-desc">
            Please double-check the Order ID or phone number used during checkout. If you placed the order recently, our Surat team may still be generating your bill.
          </p>
          <a
            href="https://wa.me/919512753471?text=Hi%20Mavtar%20Impex,%20I%20need%20help%20tracking%20my%20order."
            target="_blank"
            rel="noreferrer"
            className="whatsapp-assist-link"
          >
            <MessageSquare style={{ width: 14, height: 14 }} />
            <span>Chat With Support on WhatsApp</span>
          </a>
        </div>
      )}

    </div>
  );
};

export default TrackOrder;