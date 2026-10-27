import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight, Clock, MapPin } from "lucide-react";
import { orderApi } from "../../services/api";
import { Skeleton } from "../../components/common/Skeleton";
import "./OrderSuccess.scss";

const OrderSuccess = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      orderApi
        .track(orderNumber)
        .then((res) => {
          if (res.success && res.data) {
            setOrder(res.data);
          }
        })
        .catch((err) => console.error("Error fetching order:", err))
        .finally(() => setLoading(false));
    }
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="order-success-page" style={{ maxWidth: "680px", margin: "40px auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <Skeleton height="220px" borderRadius="20px" />
        <Skeleton height="160px" borderRadius="18px" />
      </div>
    );
  }

  return (
    <div className="order-success-page animate-fadeIn">
      
      {/* 1. Success Hero Card */}
      <div className="success-hero-card">
        <div className="success-check-bubble">
          <CheckCircle2 style={{ width: 34, height: 34 }} />
        </div>

        <span className="success-badge">
          Order Successfully Placed
        </span>

        <h1 className="success-title">
          Thank You For Choosing Mavtar Impex
        </h1>

        <p className="success-desc">
          We have received your order. Our embroidery artisans in Surat will now prepare and inspect your handcrafted linen bags.
        </p>

        <div className="ref-code-box">
          <span className="ref-label">Order Reference:</span>
          <span className="ref-code">{orderNumber}</span>
        </div>
      </div>

      {/* 2. Live Tracking Stepper Card */}
      {order && (
        <div className="tracking-progress-card animate-fadeIn">
          <h3 className="timeline-title">
            <Package style={{ width: 20, height: 20 }} />
            <span>Artisan Production & Dispatch Timeline</span>
          </h3>

          <div className="timeline-steps">
            {order.trackingSteps?.map((step, idx) => (
              <div key={idx} className="timeline-row">
                <div className="node-track">
                  <div className={`node-bubble ${step.completed ? "active" : ""}`}>
                    {step.completed ? "✓" : idx + 1}
                  </div>
                  {idx < order.trackingSteps.length - 1 && (
                    <div className={`node-line ${step.completed ? "active" : ""}`} />
                  )}
                </div>
                <div className="node-content">
                  <span className={`step-name ${step.completed ? "active" : ""}`}>
                    {step.title}
                  </span>
                  {step.time && (
                    <span className="step-date">
                      {new Date(step.time).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Destination Details */}
          <div className="summary-grid">
            <div className="info-block">
              <span className="label">Recipient</span>
              <span className="value-name">{order.customerName}</span>
              <span className="value-sub">📞 {order.customerPhone}</span>
            </div>
            <div className="info-block">
              <span className="label">Shipping Destination</span>
              <span className="value-sub">
                📍 {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Action Buttons */}
      <div className="success-actions-row">
        <Link to={`/track?order=${orderNumber}`} className="btn-track">
          <span>Live Track Order</span>
          <ArrowRight style={{ width: 15, height: 15 }} />
        </Link>
        <Link to="/shop" className="btn-continue-shop">
          <span>Continue Shopping</span>
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccess;