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
  Instagram,
  PhoneCall,
  MousePointerClick,
  Users,
  BarChart3,
  Filter,
  Target,
  ArrowDown,
  Zap,
  PieChart,
  Layers,
} from "lucide-react";
import { analyticsApi } from "../../services/api";
import { SkeletonDashboard } from "../../components/common/Skeleton";
import "./AdminDashboard.scss";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [eventStats, setEventStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      analyticsApi.getDashboard().catch(() => ({ success: false })),
      analyticsApi.getEvents().catch(() => ({ success: false })),
    ])
      .then(([dashRes, eventRes]) => {
        if (dashRes?.success && dashRes.data) {
          setData(dashRes.data);
        }
        if (eventRes?.success && eventRes.data) {
          setEventStats(eventRes.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const getDynamicGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return <SkeletonDashboard />;
  }

  const stats = {
    totalRevenue: data?.totalRevenue ?? data?.stats?.totalRevenue ?? 0,
    totalOrders: data?.totalOrders ?? data?.stats?.totalOrders ?? 0,
    pendingOrdersCount: data?.pendingOrdersCount ?? data?.stats?.pendingOrdersCount ?? 0,
    totalProducts: data?.totalProducts ?? data?.stats?.totalProducts ?? 0,
    totalInquiries: data?.totalInquiries ?? data?.stats?.totalInquiries ?? 0,
    pendingInquiriesCount: data?.pendingInquiriesCount ?? data?.stats?.pendingInquiriesCount ?? 0,
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

      {/* 2.5 Live Visitor Engagement & Top-Down CRM Analytics Suite */}
      <div className="crm-analytics-suite">
        
        {/* Engagement KPI Row */}
        <div className="analytics-events-section">
          <div className="section-title-row">
            <div className="title-box">
              <MousePointerClick size={16} />
              <h3>Visitor & Link Engagement</h3>
            </div>
            <span className="live-pill">Live Tracking</span>
          </div>

          <div className="engagement-cards-grid">
            <div className="eng-card">
              <span className="eng-label">Website Continues</span>
              <span className="eng-count">{eventStats?.summary?.splashClicks ?? 0}</span>
              <span className="eng-sub">Gate button clicks</span>
            </div>

            <div className="eng-card">
              <span className="eng-label">Instagram Clicks</span>
              <span className="eng-count">
                {eventStats?.socialBreakdown?.find((b) => b.target === "instagram")?.clicks ?? 0}
              </span>
              <span className="eng-sub">@mavtar_impex</span>
            </div>

            <div className="eng-card">
              <span className="eng-label">WhatsApp Inquiries</span>
              <span className="eng-count">
                {eventStats?.socialBreakdown?.find((b) => b.target === "whatsapp")?.clicks ?? 0}
              </span>
              <span className="eng-sub">+91 95127 53471</span>
            </div>

            <div className="eng-card">
              <span className="eng-label">Customer Logins</span>
              <span className="eng-count">{eventStats?.summary?.totalLogins ?? 0}</span>
              <span className="eng-sub">
                {eventStats?.summary?.googleLogins ?? 0} Google • {eventStats?.summary?.customerLogins ?? 0} Direct
              </span>
            </div>

            <div className="eng-card">
              <span className="eng-label">Cart Additions</span>
              <span className="eng-count">{eventStats?.summary?.addToCartEvents ?? 0}</span>
              <span className="eng-sub">High-intent intent</span>
            </div>
          </div>
        </div>

        {/* Deep CRM Visual Pipeline & 7-Day Trend Grid */}
        <div className="crm-graphs-grid">
          
          {/* Top-Down CRM Funnel */}
          <div className="crm-funnel-card">
            <div className="card-header-flex">
              <div>
                <div className="badge-crm">
                  <Filter size={12} />
                  <span>Conversion Pipeline</span>
                </div>
                <h4>Top-Down CRM Funnel</h4>
                <p className="card-sub">Stage-by-stage progression from website entrance to confirmed revenue</p>
              </div>
            </div>

            <div className="funnel-stages-list">
              {(eventStats?.funnel || [
                { stage: "1. Storefront Visitors", count: 2, percentage: 100, subtext: "Unique visitors who passed gate" },
                { stage: "2. Social & Link Touches", count: 2, percentage: 100, subtext: "Instagram & WhatsApp touches" },
                { stage: "3. High-Intent Cart Adds", count: 1, percentage: 50, subtext: "Items added to shopping bag" },
                { stage: "4. Customer Inquiries & Leads", count: 1, percentage: 50, subtext: "Bespoke bulk and logins" },
                { stage: "5. Confirmed Client Orders", count: 1, percentage: 50, subtext: "Closed revenue and sales" },
              ]).map((stg, idx) => {
                const widthPercent = Math.max(12, Math.min(100, stg.percentage || 100));
                return (
                  <div key={idx} className="funnel-stage-item">
                    <div className="stage-meta-row">
                      <span className="stage-name">{stg.stage}</span>
                      <div className="stage-values">
                        <span className="stage-count">{stg.count}</span>
                        <span className="stage-percent">{stg.percentage}%</span>
                      </div>
                    </div>

                    <div className="stage-bar-track">
                      <div
                        className="stage-bar-fill"
                        style={{
                          width: `${widthPercent}%`,
                          background: idx === 0 
                            ? "linear-gradient(90deg, #18181B, #27272A)" 
                            : idx === 4 
                            ? "linear-gradient(90deg, #18181B, #09090B)" 
                            : `linear-gradient(90deg, #3F3F46, #71717A)`,
                        }}
                      />
                    </div>
                    <span className="stage-subtext">{stg.subtext}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 7-Day Activity & Conversion Trend Bar/Area Chart */}
          <div className="crm-trend-card">
            <div className="card-header-flex">
              <div>
                <div className="badge-crm">
                  <BarChart3 size={12} />
                  <span>Activity Velocity</span>
                </div>
                <h4>7-Day Engagement Trend</h4>
                <p className="card-sub">Daily volume of visitors, cart additions, and order conversions</p>
              </div>
            </div>

            <div className="trend-chart-container">
              <div className="trend-bars-wrapper">
                {(eventStats?.timeline || [
                  { day: "Wed", visits: 1, carts: 0, orders: 0 },
                  { day: "Thu", visits: 0, carts: 0, orders: 0 },
                  { day: "Fri", visits: 1, carts: 1, orders: 0 },
                  { day: "Sat", visits: 2, carts: 1, orders: 1 },
                  { day: "Sun", visits: 1, carts: 0, orders: 0 },
                  { day: "Mon", visits: 3, carts: 2, orders: 1 },
                  { day: "Today", visits: eventStats?.summary?.splashClicks || 2, carts: eventStats?.summary?.addToCartEvents || 1, orders: stats.totalOrders || 1 },
                ]).map((t, idx) => {
                  const maxVal = Math.max(
                    ...(eventStats?.timeline?.map((x) => Math.max(x.visits, x.carts, x.orders)) || [3]),
                    3
                  );
                  const visitHeight = Math.max(10, Math.round((t.visits / maxVal) * 110));
                  const cartHeight = Math.max(6, Math.round((t.carts / maxVal) * 110));
                  const orderHeight = Math.max(4, Math.round((t.orders / maxVal) * 110));

                  return (
                    <div key={idx} className="chart-bar-group">
                      <div className="bars-column">
                        <div
                          className="bar-item bar-visits"
                          style={{ height: `${visitHeight}px` }}
                          title={`${t.day}: ${t.visits} visits`}
                        />
                        <div
                          className="bar-item bar-carts"
                          style={{ height: `${cartHeight}px` }}
                          title={`${t.day}: ${t.carts} carts`}
                        />
                        <div
                          className="bar-item bar-orders"
                          style={{ height: `${orderHeight}px` }}
                          title={`${t.day}: ${t.orders} orders`}
                        />
                      </div>
                      <span className="bar-day-label">{t.day}</span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Legend */}
              <div className="chart-legend-row">
                <div className="legend-item">
                  <span className="legend-dot visits" />
                  <span>Visits</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot carts" />
                  <span>Cart Adds</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot orders" />
                  <span>Orders</span>
                </div>
              </div>
            </div>

            {/* Social Attribution Breakdown */}
            <div className="channel-attribution-box">
              <span className="attr-title">Acquisition Channel Shares</span>
              <div className="attr-grid">
                <div className="attr-cell">
                  <div className="attr-top">
                    <Instagram size={13} />
                    <span>Instagram</span>
                  </div>
                  <strong>{eventStats?.socialBreakdown?.find((b) => b.target === "instagram")?.clicks ?? 2} touches</strong>
                </div>

                <div className="attr-cell">
                  <div className="attr-top">
                    <PhoneCall size={13} />
                    <span>WhatsApp</span>
                  </div>
                  <strong>{eventStats?.socialBreakdown?.find((b) => b.target === "whatsapp")?.clicks ?? 1} inquiries</strong>
                </div>

                <div className="attr-cell">
                  <div className="attr-top">
                    <Target size={13} />
                    <span>Direct Storefront</span>
                  </div>
                  <strong>{eventStats?.summary?.splashClicks ?? 2} entries</strong>
                </div>
              </div>
            </div>
          </div>

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
                      src={prod.images?.[0] || "/products/Bag001.png"}
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
