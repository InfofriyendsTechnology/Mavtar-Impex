import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Truck, ArrowLeft, QrCode, Banknote, CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "../../context/CartContext";
import { orderApi } from "../../services/api";
import toast from "react-hot-toast";

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
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-zinc-950">Your Bag is Empty</h2>
        <p className="text-sm text-linen-600">Please add products before checking out.</p>
        <Link to="/shop" className="inline-block bg-zinc-900 text-gold-200 px-6 py-2.5 rounded text-xs font-semibold">
          Explore Bags
        </Link>
      </div>
    );
  }

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "MAVTAR10") {
      const discount = Math.round(subtotal * 0.1);
      setCouponDiscount(discount);
      setCouponApplied(true);
      toast.success("Coupon MAVTAR10 applied! 10% discount subtracted.");
    } else {
      toast.error("Invalid coupon code. Try 'MAVTAR10'");
    }
  };

  const finalAmount = Math.max(0, grandTotal - couponDiscount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerPhone || !formData.addressLine1 || !formData.pincode) {
      toast.error("Please fill in all required delivery details");
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
      toast.error(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Return to cart */}
      <Link to="/shop" className="inline-flex items-center gap-1.5 text-xs text-linen-600 hover:text-zinc-900 font-semibold">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Continue Shopping</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Delivery Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-linen-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-linen-100 pb-4">
              <Truck className="w-5 h-5 text-zinc-900" />
              <h2 className="font-serif text-2xl font-bold text-zinc-950">Shipping & Delivery Details</h2>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-linen-800 mb-1">
                    Full Name <span className="text-ruby-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-linen-800 mb-1">
                    Mobile Number (for delivery updates) <span className="text-ruby-700">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value.replace(/\D/g, "") })}
                    className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-linen-800 mb-1">
                  Email Address (optional)
                </label>
                <input
                  type="email"
                  placeholder="ramesh@example.com"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-linen-800 mb-1">
                  Flat / House No. / Street Address <span className="text-ruby-700">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 402, Shivalik Heights, Ring Road"
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-linen-800 mb-1">
                    City <span className="text-ruby-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-linen-800 mb-1">
                    State <span className="text-ruby-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-linen-800 mb-1">
                    PIN Code <span className="text-ruby-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })}
                    className="w-full bg-linen-50 border border-linen-300 rounded px-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-4 border-t border-linen-100 space-y-3">
                <label className="block text-xs font-bold text-zinc-950 uppercase tracking-wider">
                  Payment Method
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === "COD"
                        ? "border-zinc-800 bg-zinc-50/50"
                        : "border-linen-300 hover:bg-linen-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "COD" })}
                      className="mt-0.5 accent-zinc-900"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-950">
                        <Banknote className="w-4 h-4 text-zinc-800" />
                        <span>Cash on Delivery (COD)</span>
                      </div>
                      <p className="text-[11px] text-linen-500 mt-0.5">Pay in cash or UPI when delivered to your door.</p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === "ONLINE_UPI"
                        ? "border-zinc-800 bg-zinc-50/50"
                        : "border-linen-300 hover:bg-linen-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ONLINE_UPI"
                      checked={formData.paymentMethod === "ONLINE_UPI"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "ONLINE_UPI" })}
                      className="mt-0.5 accent-zinc-900"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-950">
                        <QrCode className="w-4 h-4 text-gold-600" />
                        <span>Instant UPI / QR Mock</span>
                      </div>
                      <p className="text-[11px] text-linen-500 mt-0.5">Google Pay / PhonePe / Paytm Instant Confirmation.</p>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-linen-200 shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-bold text-zinc-950 border-b border-linen-100 pb-3">
              Order Summary ({cart.length} items)
            </h3>

            {/* Items list */}
            <div className="divide-y divide-linen-100 max-h-60 overflow-y-auto space-y-2 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-14 object-cover rounded bg-linen-100 border border-linen-200 shrink-0"
                    onError={(e) => {
                      e.target.src = "/products/royal-elephant-green-tote.jpg";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-zinc-950 truncate">{item.title}</p>
                    <p className="text-linen-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-bold text-linen-900 shrink-0">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-3 border-t border-linen-100">
              <input
                type="text"
                placeholder="Coupon (e.g. MAVTAR10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-linen-50 border border-linen-300 rounded px-3 py-1.5 text-xs uppercase focus:outline-none focus:border-gold-500"
              />
              <button
                type="submit"
                className="bg-linen-200 hover:bg-gold-500 hover:text-zinc-950 text-zinc-950 px-3 py-1.5 rounded text-xs font-bold transition-colors"
              >
                Apply
              </button>
            </form>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs pt-3 border-t border-linen-100">
              <div className="flex justify-between text-linen-600">
                <span>Subtotal</span>
                <span className="font-semibold text-linen-900">₹{subtotal}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-ruby-700 font-semibold">
                  <span>Coupon Discount (MAVTAR10)</span>
                  <span>-₹{couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-linen-600">
                <span>Pan-India Shipping</span>
                <span className="font-semibold text-zinc-800">
                  {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                </span>
              </div>

              <div className="pt-2 border-t border-linen-200 flex justify-between text-base font-bold text-zinc-950">
                <span>Grand Total</span>
                <span className="text-xl text-zinc-950">₹{finalAmount}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full bg-zinc-900 hover:bg-black text-white py-3.5 px-4 rounded-full font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Confirm Order • ₹{finalAmount}</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-linen-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-zinc-700" />
              <span>Certified Handcrafted Indian Linen Quality Guarantee</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Checkout;
