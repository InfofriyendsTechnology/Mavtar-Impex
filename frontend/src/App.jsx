import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Contexts
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Public Components
import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// Public Pages
import Home from "./pages/public/Home";
import Shop from "./pages/public/Shop";
import ProductDetail from "./pages/public/ProductDetail";
import Checkout from "./pages/public/Checkout";
import OrderSuccess from "./pages/public/OrderSuccess";
import TrackOrder from "./pages/public/TrackOrder";
import Craftsmanship from "./pages/public/Craftsmanship";
import CustomInquiry from "./pages/public/CustomInquiry";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminSettings from "./pages/admin/AdminSettings";

// Public Shell
const PublicLayout = () => {
  // If user opens the Admin Panel port (2253), redirect root to /admin
  if (typeof window !== "undefined" && window.location.port === "2253" && window.location.pathname === "/") {
    window.location.replace("/admin");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-linen-50">
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: "#0b2b1f",
                color: "#faf7f2",
                border: "1px solid #c5a059",
                fontSize: "13px",
              },
            }}
          />

          <Routes>
            {/* Public Storefront Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:orderNumber" element={<OrderSuccess />} />
              <Route path="/track" element={<TrackOrder />} />
              <Route path="/craftsmanship" element={<Craftsmanship />} />
              <Route path="/bulk-inquiry" element={<CustomInquiry />} />
            </Route>

            {/* Admin Backoffice Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
