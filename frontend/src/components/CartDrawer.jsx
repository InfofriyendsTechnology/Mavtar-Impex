import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    isFreeShipping,
    amountToFreeShipping,
    FREE_SHIPPING_THRESHOLD,
    shippingFee,
    grandTotal,
  } = useCart();

  const navigate = useNavigate();

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Animated Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Animated Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-linen-200 flex items-center justify-between bg-linen-50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-900" />
                  <h2 className="font-serif text-xl font-bold text-emerald-950">Your Shopping Bag</h2>
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-linen-600 hover:text-emerald-950 rounded-full hover:bg-linen-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="bg-emerald-950 text-gold-200 p-4 border-b border-gold-500/20 text-xs">
                {isFreeShipping ? (
                  <div className="flex items-center gap-2 text-gold-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Congratulations! You qualify for <strong>FREE Pan-India Delivery</strong></span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-linen-100">
                      <span>Add <strong>₹{amountToFreeShipping}</strong> more for Free Shipping</span>
                      <span className="font-bold text-gold-400">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-emerald-900/80 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-gold-500 h-full rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-linen-100 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-linen-100 flex items-center justify-center text-emerald-900">
                      <ShoppingBag className="w-10 h-10 stroke-1" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-emerald-950">Your bag is currently empty</h3>
                      <p className="text-sm text-linen-600 mt-1 max-w-xs">
                        Explore our handcrafted collection of royal embroidered linen tote bags and evening potlis.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate("/shop");
                      }}
                      className="bg-emerald-900 hover:bg-emerald-800 text-gold-200 px-6 py-2.5 rounded text-sm font-semibold tracking-wide transition-colors"
                    >
                      Explore Collection
                    </motion.button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                      <img
                        src={item.image || "/products/royal-elephant-green-tote.jpg"}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg border border-linen-200 flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm font-bold text-emerald-950 line-clamp-1">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-linen-400 hover:text-red-600 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-linen-500">{item.fabric || "Pure Flax Linen"}</div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-linen-300 rounded overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-linen-600 hover:bg-linen-100 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-1 text-xs font-bold text-linen-900 bg-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-linen-600 hover:bg-linen-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-semibold text-linen-900">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-linen-200 bg-linen-50 space-y-3">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-linen-600">
                      <span>Bag Subtotal</span>
                      <span className="font-semibold text-linen-900">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-linen-600">
                      <span>Estimated Shipping</span>
                      <span className="font-semibold text-emerald-800">
                        {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-linen-200 flex justify-between text-base font-bold text-emerald-950">
                      <span>Total Due</span>
                      <span>₹{grandTotal}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate("/checkout");
                    }}
                    className="w-full bg-emerald-900 hover:bg-emerald-800 text-white py-3.5 px-4 rounded font-semibold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <p className="text-[11px] text-center text-linen-500 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Safe & Secure 256-bit Encrypted Checkout • COD Available</span>
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
