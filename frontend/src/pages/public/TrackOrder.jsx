import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, MapPin } from "lucide-react";
import { orderApi } from "../../services/api";

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
      setErrorMsg("No active order found with this Order ID or Phone number. Please verify.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs font-bold tracking-widest text-gold-600 uppercase">
          Real-Time Tracking
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-emerald-950">
          Track Your Handcrafted Order
        </h1>
        <p className="text-sm text-linen-600">
          Enter your 6-digit Order Reference Number (e.g. <code>MVT-849201</code>) or your 10-digit mobile number.
        </p>
      </div>

      {/* Search Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTrack();
        }}
        className="max-w-xl mx-auto flex gap-2 bg-white p-2 rounded-xl border border-linen-300 shadow-sm"
      >
        <div className="relative flex-1">
          <input
            type="text"
            required
            placeholder="Enter Order ID (e.g. MVT-...) or Phone Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-xs text-linen-900 rounded focus:outline-none"
          />
          <Search className="w-4 h-4 text-linen-400 absolute left-3 top-3" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-900 hover:bg-emerald-800 text-gold-200 px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-colors"
        >
          {loading ? "Tracking..." : "Track Status"}
        </button>
      </form>

      {/* Result Container */}
      {order && (
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gold-500/30 shadow-luxury space-y-8 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-linen-100 gap-4">
            <div>
              <span className="text-xs text-linen-500">Order Number</span>
              <h2 className="font-serif text-2xl font-bold text-emerald-950 tracking-wider">
                {order.orderNumber}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                Status: {order.orderStatus}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-linen-100 text-linen-800">
                Payment: {order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Stepper */}
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-bold text-emerald-950 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-800" />
              <span>Production & Delivery Progress</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {order.trackingSteps?.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
                    step.completed
                      ? "bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-sm"
                      : "bg-linen-50 border-linen-200 text-linen-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-bold ${
                      step.completed ? "bg-emerald-900 text-gold-300" : "bg-linen-200 text-linen-500"
                    }`}
                  >
                    {step.completed ? "✓" : idx + 1}
                  </div>
                  <h4 className="font-serif text-sm font-bold leading-tight">{step.title}</h4>
                  {step.time && (
                    <p className="text-[10px] text-linen-500">
                      {new Date(step.time).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ordered Bags & Destination Details */}
          <div className="pt-6 border-t border-linen-100 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            <div>
              <h4 className="font-bold text-emerald-950 uppercase tracking-wider mb-3">
                Items in This Shipment ({order.items?.length || 0})
              </h4>
              <div className="divide-y divide-linen-100 space-y-2">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt=""
                      className="w-12 h-14 object-cover rounded bg-linen-100 border border-linen-200"
                      onError={(e) => {
                        e.target.src = "/products/royal-elephant-green-tote.jpg";
                      }}
                    />
                    <div>
                      <p className="font-semibold text-emerald-950">{item.title}</p>
                      <p className="text-linen-500">Quantity: {item.quantity}</p>
                      <p className="font-bold text-linen-800">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-emerald-950 uppercase tracking-wider mb-3">
                Delivery Details
              </h4>
              <div className="p-4 bg-linen-50 rounded-lg space-y-1.5 text-linen-700">
                <p className="font-bold text-emerald-950">{order.customerName}</p>
                <p>Phone: {order.customerPhone}</p>
                <p>
                  {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                </p>
                <div className="pt-2 text-emerald-900 font-bold">
                  Total Paid: ₹{order.totalAmount}
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {searched && !order && !loading && (
        <div className="bg-white rounded-xl p-8 text-center text-linen-600 border border-linen-200">
          <p className="text-ruby-700 font-semibold">{errorMsg || "No record found."}</p>
          <p className="text-xs text-linen-500 mt-1">
            Need assistance? WhatsApp our care team at +91 95127 53471.
          </p>
        </div>
      )}

    </div>
  );
};

export default TrackOrder;
