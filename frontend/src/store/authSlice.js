import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../services/api";

const getInitialUser = () => {
  const userStr = localStorage.getItem("mavtar_admin_user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

const initialToken = localStorage.getItem("mavtar_admin_token") || null;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      if (response.success && response.data) {
        localStorage.setItem("mavtar_admin_token", response.data.token);
        localStorage.setItem("mavtar_admin_user", JSON.stringify(response.data.user));
        return response.data;
      }
      return rejectWithValue(response.message || "Login failed");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || "Invalid credentials");
    }
  }
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getMe();
      if (response.success && response.data) {
        localStorage.setItem("mavtar_admin_user", JSON.stringify(response.data.user));
        return response.data.user;
      }
      return rejectWithValue("Failed to fetch session");
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getInitialUser(),
    token: initialToken,
    isAuthenticated: !!initialToken,
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("mavtar_admin_token", action.payload.token);
      localStorage.setItem("mavtar_admin_user", JSON.stringify(action.payload.user));
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("mavtar_admin_user", JSON.stringify(state.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("mavtar_admin_token");
      localStorage.removeItem("mavtar_admin_user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { loginSuccess, updateUser, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
