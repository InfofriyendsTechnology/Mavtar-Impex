import React, { createContext, useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addToCart as reduxAddToCart,
  removeFromCart as reduxRemoveFromCart,
  updateQuantity as reduxUpdateQuantity,
  clearCart as reduxClearCart,
  openCart as reduxOpenCart,
  closeCart as reduxCloseCart,
} from "../store/cartSlice";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("mavtar_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const FREE_SHIPPING_THRESHOLD = 999;
  const STANDARD_SHIPPING_FEE = 99;

  useEffect(() => {
    localStorage.setItem("mavtar_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: Number(product.price),
            originalPrice: Number(product.originalPrice || product.price),
            image: product.images?.[0] || "/products/royal-elephant-green-tote.jpg",
            category: product.category,
            fabric: product.fabric,
            quantity: Number(quantity),
          },
        ];
      }
    });

    // Also dispatch to Redux store
    dispatch(reduxAddToCart({ product, quantity }));

    toast.success(`${product.title} added to your bag!`, {
      style: {
        background: "#18181B",
        color: "#FFFFFF",
        border: "1px solid #3F3F46",
        borderRadius: "9999px",
        padding: "10px 18px",
        fontSize: "13px",
        fontWeight: "500",
      },
      iconTheme: {
        primary: "#FFFFFF",
        secondary: "#18181B",
      },
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
    dispatch(reduxUpdateQuantity({ id, quantity: newQuantity }));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    dispatch(reduxRemoveFromCart(id));
    toast.error("Item removed from bag", {
      style: {
        background: "#18181B",
        color: "#FFFFFF",
        border: "1px solid #3F3F46",
        borderRadius: "9999px",
        padding: "10px 18px",
        fontSize: "13px",
      },
    });
  };

  const clearCart = () => {
    setCart([]);
    dispatch(reduxClearCart());
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cart.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = subtotal + shippingFee;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        totalItemsCount,
        isFreeShipping,
        shippingFee,
        grandTotal,
        amountToFreeShipping,
        FREE_SHIPPING_THRESHOLD,
        isCartOpen,
        setIsCartOpen: (open) => {
          setIsCartOpen(open);
          if (open) dispatch(reduxOpenCart());
          else dispatch(reduxCloseCart());
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
