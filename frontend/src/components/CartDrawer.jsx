import React from "react";
import { useNavigate } from "react-router-dom";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import "./CartDrawer.scss";

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    isFreeShipping,
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
        <div className="cart-drawer-overlay">
          {/* Smooth Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => setIsCartOpen(false)}
          />

          {/* Smooth Sliding Drawer Panel */}
          <motion.div
            className="cart-panel-slider"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
        <div className="cart-drawer-header">
          <div className="header-title-box">
            <ShoppingBag size={18} />
            <h2>Shopping Bag</h2>
            <span className="items-badge">
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="btn-close-drawer">
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="free-shipping-strip">
          {isFreeShipping ? (
            <div className="shipping-qualify">
              <CheckCircle2 size={15} />
              <span>You qualify for <strong>FREE Pan-India Delivery</strong></span>
            </div>
          ) : (
            <div className="shipping-progress-box">
              <div className="progress-text-row">
                <span>Add ₹{amountToFreeShipping} more for Free Shipping</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="cart-items-scroll-area">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-circle">
                <ShoppingBag size={28} />
              </div>
              <h3>Your bag is empty</h3>
              <p>Explore our handcrafted collection of royal embroidered linen tote bags.</p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/shop");
                }}
                className="btn-start-shopping"
              >
                Shop Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img
                  src={item.image || "/products/Bag001.png"}
                  alt={item.title}
                  className="item-thumb"
                />
                <div className="item-details">
                  <div className="item-top-row">
                    <h4 className="item-title">{item.title}</h4>
                    <button onClick={() => removeFromCart(item.id)} className="btn-remove-item">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="item-qty-row">
                    <div className="qty-stepper">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={11} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={11} />
                      </button>
                    </div>
                    <span className="item-subtotal">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="calc-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="calc-row total-row">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/checkout");
                  }}
                  className="btn-checkout-now"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
