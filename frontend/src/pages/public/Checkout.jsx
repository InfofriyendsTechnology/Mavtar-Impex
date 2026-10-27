import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Truck, ArrowLeft, QrCode, Banknote, ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "../../context/CartContext";
import { orderApi } from "../../services/api";
import toast from "react-hot-toast";
import "./Checkout.scss";

const Checkout = () => {
  const { cart, subtotal, isFreeShipping, shippingFee, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    addressLine1: "",
    addressLine2: "",
    city: "Surat",
    state: "Gujarat",
    pincode: "395006",
    paymentMethod: "COD",
    notes: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="checkout-page animate-fadeIn">
        <div className="empty-bag-card">
          <div className="empty-icon-circle">
            <ShoppingBag style={{ width: 28, height: 28 }} />
          </div>
          <h2 className="empty-title">Your Bag is Empty</h2>
          <p className="empty-desc">
            Please add handcrafted linen bags to your cart before proceeding to checkout.
          </p>
          <Link to="/shop" className="btn-shop-now">
            Explore Handcrafted Bags
          </Link>
        </div>
      </div>
    );
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "MAVTAR10") {
      const discount = Math.round(subtotal * 0.1);
      setCouponDiscount(discount);
      setCouponApplied(true);
      toast.success("Coupon applied (10% off)");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const finalAmount = Math.max(0, grandTotal - couponDiscount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone || !formData.addressLine1 || !formData.pincode) {
      toast.error("Required fields missing");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        ...formData,
        items: cart.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        couponDiscount,
      };

      const res = await orderApi.create(orderPayload);
      if (res.success && res.data) {
        clearCart();
        try {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}
        navigate(`/order-success/${res.data.orderNumber}`);
      }
    } catch (err) {
      console.error("Order error:", err);
      toast.error(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page animate-fadeIn">
      
      {/* Navigation Top Bar */}
      <div className="checkout-nav-bar">
        <Link to="/shop" className="return-link">
          <ArrowLeft style={{ width: 16, height: 16 }} />
          <span>Continue Shopping</span>
        </Link>
        <span className="secure-badge">
          <ShieldCheck style={{ width: 14, height: 14 }} />
          <span>100% Secure Checkout</span>
        </span>
      </div>

      <div className="checkout-grid">
        
        {/* Left Column: Delivery Form */}
        <div className="delivery-form-card">
          <div className="card-header-row">
            <div className="icon-box">
              <Truck style={{ width: 20, height: 20 }} />
            </div>
            <h2 className="heading-text">Shipping & Delivery Details</h2>
          </div>

          <form id="checkout-form" onSubmit={handleSubmit} className="form-fields-stack">
            <div className="form-row-2col">
              <div className="form-group">
                <label className="field-label">
                  Full Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="lux-input"
                />
              </div>

              <div className="form-group">
                <label className="field-label">
                  Mobile Number <span className="req">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value.replace(/\D/g, "") })}
                  className="lux-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="field-label">
                Email Address (Optional for order invoice)
              </label>
              <input
                type="email"
                placeholder="ramesh@example.com"
                value={formData.customerEmail}
                onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                className="lux-input"
              />
            </div>

            <div className="form-group">
              <label className="field-label">
                Flat / House No. / Building / Street Address <span className="req">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 402, Shivalik Heights, Ring Road"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                className="lux-input"
              />
            </div>

            <div className="form-row-3col">
              <div className="form-group">
                <label className="field-label">
                  City <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="lux-input"
                />
              </div>

              <div className="form-group">
                <label className="field-label">
                  State <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="lux-input"
                />
              </div>

              <div className="form-group">
                <label className="field-label">
                  PIN Code <span className="req">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })}
                  className="lux-input"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="payment-section">
              <span className="section-label">Select Payment Method</span>

              <div className="payment-grid">
                <label className={`payment-card ${formData.paymentMethod === "COD" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "COD" })}
                  />
                  <div className="pay-info">
                    <div className="pay-title">
                      <Banknote style={{ width: 16, height: 16 }} />
                      <span>Cash on Delivery</span>
                    </div>
                    <span className="pay-desc">Pay safely at your door upon parcel arrival.</span>
                  </div>
                </label>

                <label className={`payment-card ${formData.paymentMethod === "ONLINE_UPI" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE_UPI"
                    checked={formData.paymentMethod === "ONLINE_UPI"}
                    onChange={() => setFormData({ ...formData, paymentMethod: "ONLINE_UPI" })}
                  />
                  <div className="pay-info">
                    <div className="pay-title">
                      <QrCode style={{ width: 16, height: 16 }} />
                      <span>UPI / Instant QR</span>
                    </div>
                    <span className="pay-desc">Pay via Google Pay, PhonePe, or Paytm.</span>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="summary-column">
          <div className="summary-card">
            <h3 className="summary-title">
              Order Summary ({cart.length} {cart.length === 1 ? "item" : "items"})
            </h3>

            {/* Itemized List */}
            <div className="cart-items-preview">
              {cart.map((item) => (
                <div key={item.id} className="item-preview-row">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="item-image"
                    onError={(e) => {
                      e.target.src = "/products/Bag001.png";
                    }}
                  />
                  <div className="item-meta">
                    <div className="item-name">{item.title}</div>
                    <div className="item-qty">Qty: {item.quantity}</div>
                  </div>
                  <div className="item-total">
                    ₹{Number(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="coupon-form">
              <input
                type="text"
                placeholder="Coupon (e.g. MAVTAR10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button type="submit" className="btn-coupon">
                Apply
              </button>
            </form>

            {/* Breakdown Table */}
            <div className="breakdown-table">
              <div className="row">
                <span>Subtotal</span>
                <span className="val">₹{Number(subtotal).toLocaleString("en-IN")}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="row discount-row">
                  <span>Coupon Discount (MAVTAR10)</span>
                  <span className="val">-₹{Number(couponDiscount).toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="row shipping-row">
                <span>Pan-India Delivery</span>
                <span className="val">
                  {shippingFee === 0 ? <span className="free-tag">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>

              <div className="row total-row">
                <span>Grand Total</span>
                <span className="total-val">₹{Number(finalAmount).toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="btn-confirm-order"
            >
              {loading ? (
                <span>Securing Order...</span>
              ) : (
                <span>Confirm Order • ₹{Number(finalAmount).toLocaleString("en-IN")}</span>
              )}
            </button>

            <div className="trust-guarantee-note">
              <ShieldCheck style={{ width: 14, height: 14 }} />
              <span>Certified Handcrafted Linen & Free Return Guarantee</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Checkout;