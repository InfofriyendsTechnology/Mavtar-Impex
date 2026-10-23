import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  MessageSquare,
  AlertTriangle,
  Sparkles,
  Calendar,
  CheckCircle2,
  Crown,
  Database,
  Activity,
  ArrowRight,
  Clock,
  User,
} from "lucide-react";
import { analyticsApi } from "../../services/api";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi
      .getDashboard()
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
        }
      })
      .catch((err) => console.error("Error loading analytics:", err))
      .finally(() => setLoading(false));
  }, []);

  const getDynamicGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
        <div
          style={{
            width: 32,
            height: 32,
            border: "3px solid #E4E4E7",
            borderTopColor: "#18181B",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  }

  const stats = data?.stats || {
    totalRevenue: 0,
    totalOrders: 0,
    pendingOrdersCount: 0,
    totalProducts: 0,
    totalInquiries: 0,
    pendingInquiriesCount: 0,
  };

  const todayFormatted = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="admin-dashboard-page">
      
      {/* 1. Sleek Minimalist Executive Bar */}
      <div className="super-admin-greeting-card">
        <div className="greeting-content">
          <div className="greeting-badge">
            <Sparkles size={13} />
            <span>Executive Atelier Suite • Live Production</span>
          </div>

          <h1 className="greeting-heading">
            {getDynamicGreeting()}, Krish
          </h1>

          <p className="greeting-description">
            Artisanal linen catalog, multi-head zari embroidery, and pan-India dispatches.
          </p>
        </div>

        <div className="greeting-quick-actions">
          <Link to="/admin/products" className="hero-pill-btn primary">
            <ShoppingBag size={14} />
            <span>Manage Catalog</span>
          </Link>

          <Link to="/admin/orders" className="hero-pill-btn secondary">
            <Package size={14} />
            <span>Orders ({stats.pendingOrdersCount} Pending)</span>
          </Link>
        </div>
      </div>

      {/* 2. Metrics Cards Grid */}
      <div className="metrics-grid">
        
        {/* Total Sales */}
        <div className="metric-card">
          <div className="card-top">
            <span className="card-label">Total Revenue</span>
            <div className="card-icon-pill slate">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="card-value">₹{stats.totalRevenue.toLocaleString("en-IN")}</div>
          <span className="card-subtext">Pan-India orders fulfilled</span>
        </div>

        {/* Total Orders */}
        <div className="metric-card">
          <div className="card-top">
            <span className="card-label">Customer Orders</span>
            <div className="card-icon-pill">
              <Package size={18} />
            </div>
          </div>
          <div className="card-value">{stats.totalOrders}</div>
          <span className="card-subtext">{stats.pendingOrdersCount} awaiting dispatch</span>
        </div>

        {/* Catalog Products */}
        <div className="metric-card">
          <div className="card-top">
            <span className="card-label">Linen Bag Designs</span>
            <div className="card-icon-pill gold">
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="card-value">{stats.totalProducts}</div>
          <span className="card-subtext">Active royal embroidery SKUs</span>
        </div>

        {/* Bulk Inquiries */}
        <div className="metric-card">
          <div className="card-top">
            <span className="card-label">Bespoke Inquiries</span>
            <div className="card-icon-pill">
              <MessageSquare size={18} />
            </div>
          </div>
          <div className="card-value">{stats.totalInquiries}</div>
          <span className="card-subtext">{stats.pendingInquiriesCount} new leads</span>
        </div>

      </div>

      {/* 3. Two Column Layout: Recent Orders & Inventory Watch */}
      <div className="dashboard-split-grid">
        
        {/* Recent Orders Panel */}
        <div className="dashboard-panel-card">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Recent Client Orders</h3>
              <p className="panel-subtitle">Latest pan-India orders placed through the public storefront</p>
            </div>
            <Link to="/admin/orders" className="panel-link">
              <span>View All Orders</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="orders-table-wrapper">
            {(!data?.recentOrders || data.recentOrders.length === 0) ? (
              <div className="empty-orders-state">
                <Package size={36} />
                <span>No orders received yet.</span>
              </div>
            ) : (
              <table className="bond-orders-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentOrders.slice(0, 5).map((order) => {
                    const initials = (order.customerName || "Customer")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <tr key={order.id}>
                        <td>
                          <span className="order-code-badge">{order.orderNumber}</span>
                        </td>
                        <td>
                          <div className="customer-cell">
                            <div className="customer-avatar">
                              {initials}
                            </div>
                            <div className="customer-details">
                              <span className="customer-name">{order.customerName}</span>
                              <span className="customer-city">{order.city || "Pan-India"}, {order.state || "IN"}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="amount-pill">₹{Number(order.totalAmount).toLocaleString("en-IN")}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${order.orderStatus?.toLowerCase()}`}>
                            {order.orderStatus === "CONFIRMED" && <CheckCircle2 size={11} />}
                            {order.orderStatus === "PENDING" && <Clock size={11} />}
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Inventory Stock Watch */}
        <div className="dashboard-panel-card">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Inventory Stock Watch</h3>
              <p className="panel-subtitle">Current stock levels for hand-embroidered bags</p>
            </div>
            <Link to="/admin/products" className="panel-link">
              <span>Manage Stock</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="inventory-alert-list">
            {(!data?.lowStockProducts || data.lowStockProducts.length === 0) ? (
              <div className="empty-orders-state">
                <CheckCircle2 size={36} className="text-zinc-600" />
                <span>All catalog items have healthy stock levels.</span>
              </div>
            ) : (
              data.lowStockProducts.map((prod) => (
                <div key={prod.id} className="inventory-card-item">
                  <div className="prod-thumb-wrap">
                    <img
                      src={prod.images?.[0] || "/products/royal-elephant-green-tote.jpg"}
                      alt={prod.title}
                      className="prod-img"
                    />
                    <div className="prod-info">
                      <span className="prod-name" title={prod.title}>{prod.title}</span>
                      <span className="prod-sku">SKU: {prod.sku || "N/A"}</span>
                    </div>
                  </div>
                  <div className="stock-indicator-wrap">
                    <span className={`stock-count-badge ${prod.stock <= 5 ? "critical" : ""}`}>
                      {prod.stock <= 5 && <AlertTriangle size={11} />}
                      {prod.stock} in stock
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
