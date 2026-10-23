import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem("mavtar_cart_items");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  try {
    localStorage.setItem("mavtar_cart_items", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save cart to localStorage:", err);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getInitialCart(),
    isOpen: false,
    shippingThreshold: 999,
    standardShippingFee: 99,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedVariant } = action.payload;
      const variantKey = selectedVariant ? selectedVariant.id || selectedVariant.color || "" : "";
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && (item.selectedVariant?.id === selectedVariant?.id)
      );

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          id: `${product.id}-${variantKey}-${Date.now()}`,
          product,
          quantity,
          selectedVariant,
        });
      }
      saveCart(state.items);
      state.isOpen = true;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((item) => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectIsCartOpen = (state) => state.cart.isOpen;
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );
export const selectShippingFee = (state) => {
  const subtotal = selectCartSubtotal(state);
  return subtotal >= state.cart.shippingThreshold || subtotal === 0
    ? 0
    : state.cart.standardShippingFee;
};
export const selectCartTotal = (state) =>
  selectCartSubtotal(state) + selectShippingFee(state);

export default cartSlice.reducer;
