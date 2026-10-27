import React from "react";
import "./Skeleton.scss";

/**
 * Base Shimmering Skeleton component
 */
export const Skeleton = ({
  width = "100%",
  height = "20px",
  borderRadius = "8px",
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`luxury-skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

/**
 * Skeleton Product Grid (matching Admin & Storefront grid view)
 */
export const SkeletonProductGrid = ({ count = 6 }) => {
  return (
    <div className="skeleton-products-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-product-card">
          <Skeleton height="180px" borderRadius="14px" className="skeleton-image-banner" />
          <div className="skeleton-content">
            <div className="skeleton-chips-row">
              <Skeleton width="65px" height="18px" borderRadius="5px" />
              <Skeleton width="110px" height="18px" borderRadius="5px" />
            </div>
            <Skeleton width="85%" height="20px" borderRadius="6px" />
            <div className="skeleton-price-row">
              <Skeleton width="90px" height="24px" borderRadius="6px" />
              <Skeleton width="75px" height="22px" borderRadius="9999px" />
            </div>
            <div className="skeleton-actions-row">
              <Skeleton height="36px" borderRadius="10px" />
              <Skeleton height="36px" borderRadius="10px" />
              <Skeleton height="36px" borderRadius="10px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton Product Rows (matching Admin row view)
 */
export const SkeletonProductList = ({ count = 5 }) => {
  return (
    <div className="skeleton-products-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-product-row">
          <Skeleton width="60px" height="60px" borderRadius="12px" className="skeleton-row-thumb" />
          <div className="skeleton-row-info">
            <div style={{ display: "flex", gap: "8px" }}>
              <Skeleton width="60px" height="16px" borderRadius="4px" />
              <Skeleton width="100px" height="16px" borderRadius="4px" />
            </div>
            <Skeleton width="70%" height="18px" borderRadius="6px" />
          </div>
          <div className="skeleton-row-meta">
            <Skeleton width="75px" height="20px" borderRadius="6px" />
            <Skeleton width="70px" height="22px" borderRadius="9999px" />
          </div>
          <div className="skeleton-row-actions">
            <Skeleton width="80px" height="34px" borderRadius="8px" />
            <Skeleton width="65px" height="34px" borderRadius="8px" />
            <Skeleton width="34px" height="34px" borderRadius="8px" />
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Universal Skeleton Table (matching Admin Orders, Logs, Invoices)
 */
export const SkeletonTable = ({ rows = 5, cols = 7 }) => {
  return (
    <div className="skeleton-table-wrapper">
      <div className="skeleton-table-header">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton
            key={i}
            width={i === 0 ? "80px" : i === cols - 1 ? "60px" : "110px"}
            height="18px"
            borderRadius="4px"
          />
        ))}
      </div>
      <div className="skeleton-table-body">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="skeleton-table-row">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton
                key={c}
                width={c === 0 ? "70px" : c === cols - 1 ? "50px" : "100px"}
                height="16px"
                borderRadius="4px"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton Dashboard View (Metrics, Charts, Table)
 */
export const SkeletonDashboard = () => {
  return (
    <div className="skeleton-dashboard-layout">
      {/* 4 Stat Cards */}
      <div className="skeleton-stat-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Skeleton width="90px" height="14px" />
              <Skeleton width="32px" height="32px" borderRadius="50%" />
            </div>
            <Skeleton width="130px" height="28px" borderRadius="6px" />
            <Skeleton width="70%" height="12px" />
          </div>
        ))}
      </div>

      {/* Analytical Charts */}
      <div className="skeleton-charts-grid">
        <div className="skeleton-chart-box">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton width="160px" height="22px" />
            <Skeleton width="100px" height="28px" borderRadius="8px" />
          </div>
          <Skeleton height="220px" borderRadius="14px" />
        </div>
        <div className="skeleton-chart-box">
          <Skeleton width="140px" height="22px" />
          <Skeleton height="220px" borderRadius="14px" />
        </div>
      </div>

      {/* Orders Table */}
      <SkeletonTable rows={4} cols={6} />
    </div>
  );
};

/**
 * Skeleton Product Detail View (Storefront)
 */
export const SkeletonProductDetail = () => {
  return (
    <div className="skeleton-product-detail">
      <div className="skeleton-detail-gallery">
        <Skeleton className="skeleton-main-photo" height="480px" borderRadius="20px" />
        <div className="skeleton-thumbnails-row">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="skeleton-thumb" width="80px" height="80px" borderRadius="12px" />
          ))}
        </div>
      </div>
      <div className="skeleton-detail-info">
        <Skeleton className="skeleton-detail-badge" width="120px" height="26px" borderRadius="9999px" />
        <Skeleton className="skeleton-detail-title" width="85%" height="38px" borderRadius="8px" />
        <Skeleton className="skeleton-detail-price" width="40%" height="32px" borderRadius="6px" />
        <Skeleton className="skeleton-detail-desc" width="100%" height="90px" borderRadius="12px" />
        <div className="skeleton-detail-specs">
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </div>
        <Skeleton className="skeleton-detail-button" height="52px" borderRadius="9999px" />
      </div>
    </div>
  );
};

/**
 * Skeleton Inquiries List
 */
export const SkeletonInquiries = ({ count = 4 }) => {
  return (
    <div className="skeleton-inquiries-list">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-inquiry-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Skeleton width="140px" height="20px" />
            <Skeleton width="80px" height="24px" borderRadius="9999px" />
          </div>
          <Skeleton width="60%" height="16px" />
          <Skeleton width="95%" height="36px" borderRadius="8px" />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            <Skeleton width="100px" height="14px" />
            <Skeleton width="70px" height="28px" borderRadius="8px" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
