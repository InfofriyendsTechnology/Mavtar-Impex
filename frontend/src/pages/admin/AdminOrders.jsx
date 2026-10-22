import React, { useState, useEffect } from "react";
import {
  Search,
  Printer,
  X,
  Eye,
} from "lucide-react";
import { orderApi } from "../../services/api";
import toast from "react-hot-toast";
import "./AdminOrders.scss";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  const fetchOrders = () => {
    setLoading(true);
    const params = {};
    if (filterStatus !== "ALL") params.status = filterStatus;

    orderApi
      .getAll(params)
      .then((res) => {
        if (res.success && res.data) {
          setOrders(res.data);
        }
      })
      .catch((err) => console.error("Error loading orders:", err))
      .finally(() => setLoading(false));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await orderApi.updateStatus(orderId, { orderStatus: newStatus });
      if (res.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
        }
      }
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone?.includes(search)
  );

  return (
    <div className="admin-orders-page">
      
      {/* Header Bar */}
      <div className="page-header-bar">
        <div className="header-info">
          <h1 className="page-title">Customer Orders</h1>
          <p className="page-subtitle">
            Track customer shipments, manage production stages, and print dispatch invoices
          </p>
        </div>

        {/* Status Filter Pills */}
        <div className="status-filter-pills">
          {["ALL", "CONFIRMED", "IN_PRODUCTION", "SHIPPED", "DELIVERED"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`filter-btn ${filterStatus === st ? "active" : ""}`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Card */}
      <div className="orders-card">
        <div className="search-box">
          <div className="input-wrapper">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by Order ID, Customer Name, or Phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "60px 0", textAlign: "center" }}>
            <div style={{ width: 32, height: 32, border: "3px solid #0B4633", borderTopColor: "#C5A059", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>
            No orders match the current search or status filter.
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order Ref</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Destination</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Order Status</th>
                  <th style={{ textAlign: "right" }}>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td>
                      <span className="order-ref">{ord.orderNumber}</span>
                    </td>
                    <td>
                      <span className="date-text">
                        {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </td>
                    <td>
                      <div className="cust-name">{ord.customerName}</div>
                      <div className="cust-phone">{ord.customerPhone}</div>
                    </td>
                    <td style={{ color: "#4B5563" }}>
                      {ord.shippingAddress?.city}, {ord.shippingAddress?.pincode}
                    </td>
                    <td>
                      <span className="amount-tag">₹{ord.totalAmount}</span>
                    </td>
                    <td>
                      <span className="method-pill">{ord.paymentMethod}</span>
                    </td>
                    <td>
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="IN_PRODUCTION">IN_PRODUCTION</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="btn-pill-secondary"
                        style={{ height: "32px", padding: "0 10px", fontSize: "0.75rem" }}
                        title="View invoice"
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Invoice Modal */}
      {selectedOrder && (
        <div className="modal-backdrop">
          <div className="invoice-card">
            <div className="invoice-header">
              <div>
                <span className="brand-sub">Mavtar Impex Dispatch Note</span>
                <h2 className="invoice-title">Order #{selectedOrder.orderNumber}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#6B7280" }}>
                <X size={20} />
              </button>
            </div>

            <div className="invoice-details-grid">
              <div>
                <span className="section-label">Customer</span>
                <div className="data-strong">{selectedOrder.customerName}</div>
                <div style={{ color: "#4B5563" }}>{selectedOrder.customerPhone}</div>
              </div>
              <div>
                <span className="section-label">Shipping Address</span>
                <div style={{ color: "#374151" }}>
                  {selectedOrder.shippingAddress?.addressLine1}, {selectedOrder.shippingAddress?.city},{" "}
                  {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                </div>
              </div>
            </div>

            <div className="items-list">
              <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#6B7280" }}>
                Order Items ({selectedOrder.items?.length || 0})
              </span>
              {selectedOrder.items?.map((item, i) => (
                <div key={i} className="item-row">
                  <div>
                    <div className="item-name">{item.title}</div>
                    <div className="item-qty">Qty: {item.quantity}</div>
                  </div>
                  <div className="item-total">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="invoice-total-row">
              <span>Total Amount</span>
              <span>₹{selectedOrder.totalAmount}</span>
            </div>

            <div className="modal-footer">
              <button onClick={() => window.print()} className="btn-pill-secondary">
                <Printer size={14} />
                <span>Print Invoice</span>
              </button>
              <button onClick={() => setSelectedOrder(null)} className="btn-pill-primary">
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrders;
