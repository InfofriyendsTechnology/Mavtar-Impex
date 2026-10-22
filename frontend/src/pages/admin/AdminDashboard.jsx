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
            border: "3px solid #0B4633",
            borderTopColor: "#C5A059",
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
      
      {/* Super Admin Welcome & Executive Greetings */}
      <div className="super-admin-greeting-card">
        <div className="greeting-content">
          <div className="greeting-badge">
            <Sparkles size={14} className="badge-sparkle" />
            <span>Mavtar Impex Executive Suite</span>
            <span className="badge-divider">•</span>
            <span className="owner-tag">👑 Krish Vaghani (Super Admin)</span>
          </div>

          <h1 className="greeting-heading">
            {getDynamicGreeting()}, Krish Vaghani
          </h1>

          <p className="greeting-description">
            Your artisanal linen bag catalog, computerized multi-head embroidery production, and customer dispatches are running in full rhythm.
          </p>

          <div className="system-status-pills">
            <span className="status-pill active">
              <span className="status-dot"></span>
              Neon PostgreSQL Connected
            </span>
            <span className="status-pill active">
              <span className="status-dot"></span>
              Zari & Resham Embroidery Live
            </span>
            <span className="status-pill date">
              <Calendar size={13} />
              {todayFormatted}
            </span>
          </div>
        </div>

        <div className="greeting-quick-actions">
          <Link to="/admin/products" className="hero-pill-btn primary">
            <ShoppingBag size={15} />
            <span>Manage Catalog</span>
          </Link>

          <Link to="/admin/orders" className="hero-pill-btn secondary">
            <Package size={15} />
            <span>Orders ({stats.pendingOrdersCount} Pending)</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="metrics-grid">
        
        {/* Total Sales */}
        <div className="metric-card">
          <div className="card-top">
            <span className="card-label">Total Revenue</span>
            <div className="card-icon-pill green">
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

      {/* Two Column Layout: Recent Orders & Inventory Watch */}
      <div className="dashboard-grid-2">
        
        {/* Recent Orders Panel */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Recent Client Orders</h3>
              <p className="panel-subtitle">Latest pan-India orders placed through the public storefront</p>
            </div>
            <Link to="/admin/orders" className="panel-link">
              View All Orders →
            </Link>
          </div>

          <div className="panel-table-wrap">
            {(!data?.recentOrders || data.recentOrders.length === 0) ? (
              <div className="empty-state">No orders received yet.</div>
            ) : (
              <table className="bond-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentOrders.slice(0, 5).map((order) => (
                    <tr key={order.id}>
                      <td className="font-mono">{order.orderNumber}</td>
                      <td>
                        <div className="customer-cell">
                          <span className="name">{order.customerName}</span>
                          <span className="city">{order.city}, {order.state}</span>
                        </div>
                      </td>
                      <td className="amount-cell">₹{order.totalAmount}</td>
                      <td>
                        <span className={`status-pill ${order.orderStatus?.toLowerCase()}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Inventory Stock Watch */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Inventory Stock Watch</h3>
              <p className="panel-subtitle">Current stock levels for hand-embroidered bags</p>
            </div>
            <Link to="/admin/products" className="panel-link">
              Manage Stock →
            </Link>
          </div>

          <div className="panel-table-wrap">
            {(!data?.lowStockProducts || data.lowStockProducts.length === 0) ? (
              <div className="empty-state">All catalog items have healthy stock levels.</div>
            ) : (
              <div className="inventory-list">
                {data.lowStockProducts.map((prod) => (
                  <div key={prod.id} className="inventory-item">
                    <img
                      src={prod.images?.[0] || "/products/royal-elephant-green-tote.jpg"}
                      alt={prod.title}
                      className="prod-thumb"
                    />
                    <div className="prod-meta">
                      <span className="prod-title">{prod.title}</span>
                      <span className="prod-sku">SKU: {prod.sku || "N/A"}</span>
                    </div>
                    <div className="prod-stock">
                      <span className={`stock-count ${prod.stock <= 5 ? "critical" : "warning"}`}>
                        {prod.stock} in stock
                      </span>
                      {prod.stock <= 5 && (
                        <span className="critical-badge">
                          <AlertTriangle size={12} /> Low
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
