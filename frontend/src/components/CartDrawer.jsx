import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
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
    shippingFee,
    grandTotal,
    amountToFreeShipping,
    FREE_SHIPPING_THRESHOLD,
  } = useCart();

  const navigate = useNavigate();

  const progressPercent = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-zinc-900" />
                  <h2 className="font-serif text-xl font-bold text-zinc-900">Your Shopping Bag</h2>
                  <span className="text-xs font-semibold bg-zinc-200 text-zinc-800 px-2.5 py-0.5 rounded-full">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Meter */}
              <div className="bg-zinc-900 text-zinc-200 p-4 border-b border-zinc-800 text-xs">
                {isFreeShipping ? (
                  <div className="flex items-center gap-2 text-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-zinc-300 flex-shrink-0" />
                    <span>Congratulations! You qualify for <strong>FREE Pan-India Delivery</strong></span>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-zinc-300">
                      <span>Add <strong>₹{amountToFreeShipping}</strong> more for Free Shipping</span>
                      <span className="font-bold text-white">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="bg-white h-full rounded-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-zinc-100 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-800">
                      <ShoppingBag className="w-10 h-10 stroke-1" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-zinc-900">Your bag is currently empty</h3>
                      <p className="text-sm text-zinc-500 mt-1 max-w-xs">
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
                      className="bg-zinc-900 hover:bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors"
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
                        className="w-20 h-20 object-cover rounded-lg border border-zinc-200 flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-sm font-bold text-zinc-900 line-clamp-1">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-xs text-zinc-500">{item.fabric || "Pure Flax Linen"}</div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-zinc-300 rounded overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-100 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 py-1 text-xs font-bold text-zinc-900 bg-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-zinc-600 hover:bg-zinc-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-semibold text-zinc-900">
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
                <div className="p-5 border-t border-zinc-200 bg-zinc-50 space-y-3">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-zinc-600">
                      <span>Bag Subtotal</span>
                      <span className="font-semibold text-zinc-900">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Estimated Shipping</span>
                      <span className="font-semibold text-zinc-900">
                        {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-zinc-200 flex justify-between text-base font-bold text-zinc-900">
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
                    className="w-full bg-zinc-900 hover:bg-black text-white py-3.5 px-4 rounded-full font-semibold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Proceed to Secure Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <p className="text-[11px] text-center text-zinc-500 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
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
