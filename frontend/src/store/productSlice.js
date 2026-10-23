import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productApi, settingsApi } from "../services/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await productApi.getAll(params);
      if (response.success) {
        return response.data || [];
      }
      return rejectWithValue(response.message || "Failed to load products");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productApi.getById(id);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Product not found");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await settingsApi.getCategories();
      if (response.success) {
        return response.data || [];
      }
      return rejectWithValue("Failed to load categories");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    currentProduct: null,
    selectedCategory: "all",
    searchQuery: "",
    sortBy: "featured",
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setSortBy,
  clearCurrentProduct,
} = productSlice.actions;

export const selectAllProducts = (state) => state.products.items;
export const selectProductCategories = (state) => state.products.categories;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectProductsLoading = (state) => state.products.loading;

export default productSlice.reducer;
