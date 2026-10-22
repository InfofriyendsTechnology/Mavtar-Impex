import axios from "axios";

const getApiBase = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== "undefined") {
    // When running on production (e.g. Vercel), default to the live backend URL
    if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
      return "https://mavtarimpexbackend.vercel.app/api";
    }
    return "/api";
  }
  return "http://localhost:1653/api";
};

const API_BASE = getApiBase();

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("mavtar_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith("/admin") && !window.location.pathname.includes("/login")) {
      localStorage.removeItem("mavtar_admin_token");
      localStorage.removeItem("mavtar_admin_user");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export const productApi = {
  getAll: (params) => api.get("/products", { params }).then((r) => r.data),
  getById: (id) => api.get(`/products/${id}`).then((r) => r.data),
  create: (data) => api.post("/products", data).then((r) => r.data),
  update: (id, data) => api.put(`/products/${id}`, data).then((r) => r.data),
  delete: (id) => api.delete(`/products/${id}`).then((r) => r.data),
};

export const orderApi = {
  create: (data) => api.post("/orders", data).then((r) => r.data),
  track: (identifier) => api.get(`/orders/track/${identifier}`).then((r) => r.data),
  getAll: (params) => api.get("/orders", { params }).then((r) => r.data),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data).then((r) => r.data),
};

export const inquiryApi = {
  create: (data) => api.post("/inquiries", data).then((r) => r.data),
  getAll: () => api.get("/inquiries").then((r) => r.data),
  updateStatus: (id, data) => api.put(`/inquiries/${id}/status`, data).then((r) => r.data),
};

export const analyticsApi = {
  getDashboard: () => api.get("/analytics").then((r) => r.data),
};

export const authApi = {
  login: (data) => api.post("/auth/login", data).then((r) => r.data),
  getMe: () => api.get("/auth/me").then((r) => r.data),
};

export const settingsApi = {
  get: () => api.get("/settings").then((r) => r.data),
  update: (data) => api.put("/settings", data).then((r) => r.data),
  getCategories: () => api.get("/settings/categories").then((r) => r.data),
};

export const uploadApi = {
  uploadImage: (formData) => api.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  }).then((r) => r.data),
};

export default api;
