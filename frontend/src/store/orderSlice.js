import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderApi } from "../services/api";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await orderApi.getAll(params);
      if (response.success) {
        return response.data || [];
      }
      return rejectWithValue(response.message || "Failed to fetch orders");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderApi.create(orderData);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Order placement failed");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const trackOrder = createAsyncThunk(
  "orders/trackOrder",
  async (identifier, { rejectWithValue }) => {
    try {
      const response = await orderApi.track(identifier);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Order not found");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    currentOrder: null,
    trackingOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    clearTrackingOrder: (state) => {
      state.trackingOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Track Order
      .addCase(trackOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.trackingOrder = action.payload;
      })
      .addCase(trackOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder, clearTrackingOrder } = orderSlice.actions;
export const selectAllOrders = (state) => state.orders.items;
export const selectTrackingOrder = (state) => state.orders.trackingOrder;

export default orderSlice.reducer;
