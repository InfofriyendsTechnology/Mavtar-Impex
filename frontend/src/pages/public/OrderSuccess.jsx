import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Package, Truck, ArrowRight, Phone, Clock, MapPin, Sparkles } from "lucide-react";
import { orderApi } from "../../services/api";

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
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-zinc-900 border-t-gold-500 rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Success Badge */}
      <div className="bg-white rounded-2xl p-8 border border-gold-500/30 text-center shadow-luxury space-y-4">
        <div className="w-16 h-16 rounded-full bg-zinc-100 text-zinc-800 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-bold tracking-widest text-gold-600 uppercase">
          Order Successfully Placed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-950">
          Thank You For Choosing Mavtar Impex
        </h1>
        <p className="text-sm text-linen-600 max-w-md mx-auto">
          We have received your order. Our embroidery artisans in Surat will now craft and inspect your handcrafted linen bags.
        </p>

        <div className="inline-block bg-linen-100 rounded-lg px-4 py-2 border border-linen-200 text-xs">
          <span className="text-linen-500">Order Reference: </span>
          <strong className="text-zinc-950 font-bold tracking-wider">{orderNumber}</strong>
        </div>
      </div>

      {/* Live Tracking Stepper */}
      {order && (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-linen-200 shadow-sm space-y-6">
          <h3 className="font-serif text-xl font-bold text-zinc-950 flex items-center gap-2">
            <Package className="w-5 h-5 text-zinc-900" />
            <span>Artisan Production & Dispatch Timeline</span>
          </h3>

          <div className="space-y-4">
            {order.trackingSteps?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      step.completed
                        ? "bg-zinc-900 text-gold-300 shadow-sm"
                        : "bg-linen-200 text-linen-500"
                    }`}
                  >
                    {step.completed ? "✓" : idx + 1}
                  </div>
                  {idx < order.trackingSteps.length - 1 && (
                    <div
                      className={`w-0.5 h-10 ${
                        step.completed ? "bg-zinc-800" : "bg-linen-200"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p
                    className={`text-sm font-bold ${
                      step.completed ? "text-zinc-950" : "text-linen-400"
                    }`}
                  >
                    {step.title}
                  </p>
                  {step.time && (
                    <p className="text-xs text-linen-500 mt-0.5">
                      {new Date(step.time).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Details */}
          <div className="pt-6 border-t border-linen-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-zinc-950 uppercase tracking-wider">Recipient</span>
              <p className="text-linen-800 font-semibold">{order.customerName}</p>
              <p className="text-linen-600">{order.customerPhone}</p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-zinc-950 uppercase tracking-wider">Shipping Destination</span>
              <p className="text-linen-700">
                {order.shippingAddress?.addressLine1}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/shop"
          className="bg-zinc-900 hover:bg-zinc-800 text-gold-200 px-6 py-3 rounded text-sm font-semibold tracking-wide text-center"
        >
          Explore More Bags
        </Link>
        <Link
          to={`/track?order=${orderNumber}`}
          className="border border-linen-300 hover:border-gold-500 text-zinc-950 px-6 py-3 rounded text-sm font-semibold text-center"
        >
          Live Track Page
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccess;
