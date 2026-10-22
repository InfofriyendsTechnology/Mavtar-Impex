import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  MessageSquare,
  AlertTriangle,
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

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
        <div style={{ width: 32, height: 32, border: "3px solid #0B4633", borderTopColor: "#C5A059", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
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

  return (
    <div className="admin-dashboard-page">
      
      {/* Hero Header Bar */}
      <div className="dashboard-hero-bar">
        <div className="hero-text">
          <h1 className="hero-title">Overview Dashboard</h1>
          <p className="hero-subtitle">
            Real-time analytics for Mavtar Impex luxury linen bags & embroidery production
          </p>
        </div>

        <div className="hero-actions">
          <Link to="/admin/products" className="hero-pill-btn primary">
            <ShoppingBag />
            <span>Manage Catalog</span>
          </Link>

          <Link to="/admin/orders" className="hero-pill-btn secondary">
            <Package />
            <span>View Orders</span>
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
          <span className="card-subtext">{stats.pendingOrdersCount} orders in progress</span>
        </div>

        {/* Active Products */}
        <div className="metric-card">
          <div className="card-top">
            <span className="card-label">Active Linen Bags</span>
            <div className="card-icon-pill gold">
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="card-value">{stats.totalProducts}</div>
          <span className="card-subtext">Price: ₹600 - ₹2,000</span>
        </div>

        {/* Bulk Inquiries */}
        <div className="metric-card">
          <div className="card-top">
            <span className="card-label">Bulk & Gifting Leads</span>
            <div className="card-icon-pill danger">
              <MessageSquare size={18} />
            </div>
          </div>
          <div className="card-value">{stats.totalInquiries}</div>
          <span className="card-subtext">{stats.pendingInquiriesCount} new inquiries pending</span>
        </div>

      </div>

      {/* Split Grid: Recent Orders & Inventory Watch */}
      <div className="dashboard-split-grid">
        
        {/* Orders Table Panel */}
        <div className="dashboard-panel-card">
          <div className="panel-header">
            <h3 className="panel-title">Recent Customer Orders</h3>
            <Link to="/admin/orders" className="panel-link">
              View All Orders →
            </Link>
          </div>

          {data?.recentOrders?.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6B7280", padding: "40px 0", fontSize: "0.85rem" }}>
              No orders received yet.
            </p>
          ) : (
            <div className="orders-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order Ref</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.recentOrders?.map((ord) => (
                    <tr key={ord.id}>
                      <td style={{ fontWeight: 700, color: "#0B4633" }}>{ord.orderNumber}</td>
                      <td>
                        <div className="cust-name">{ord.customerName}</div>
                        <div className="cust-phone">{ord.customerPhone}</div>
                      </td>
                      <td>{ord.items?.length || 1} bags</td>
                      <td className="ord-price">₹{ord.totalAmount}</td>
                      <td>
                        <span className="status-pill">{ord.orderStatus}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Inventory Watch */}
        <div className="dashboard-panel-card">
          <div className="panel-header">
            <h3 className="panel-title">Inventory Alerts</h3>
            <span style={{ fontSize: "0.74rem", color: "#6B7280" }}>Stock Threshold: 15</span>
          </div>

          <div className="inventory-alert-list">
            {data?.lowStockProducts?.length === 0 ? (
              <p style={{ textAlign: "center", color: "#6B7280", padding: "30px 0", fontSize: "0.82rem" }}>
                All linen bag variants have healthy stock!
              </p>
            ) : (
              data?.lowStockProducts?.map((prod) => (
                <div key={prod.id} className="alert-item">
                  <div>
                    <div className="item-name">{prod.title}</div>
                    <div style={{ fontSize: "0.72rem", color: "#6B7280" }}>₹{prod.price}</div>
                  </div>
                  <span className="stock-tag">{prod.stock} left</span>
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
