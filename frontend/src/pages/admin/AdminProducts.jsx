import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  X,
  ShoppingBag,
  ExternalLink,
  LayoutGrid,
  LayoutList,
  AlertTriangle,
} from "lucide-react";
import { productApi, uploadApi } from "../../services/api";
import { SkeletonProductGrid, SkeletonTable } from "../../components/common/Skeleton";
import toast from "react-hot-toast";
import "./AdminProducts.scss";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "row"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const tableScrollRef = useRef(null);

  const handleScrollTable = (delta) => {
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
    }
  };

  const initialForm = {
    title: "",
    price: 1299,
    originalPrice: 1899,
    stock: 50,
    category: "Royal Heritage Embroidery",
    fabric: "100% Heavy-GSM Belgian Flax Linen",
    embroideryType: "Multi-Head Computerized Zari & Velvet Applique",
    dimensions: "15\"H x 16\"W x 5.5\"D",
    closure: "Magnetic Brass Snap + Inner Zip Pocket",
    lining: "Water-Resistant Organic Cotton Lining",
    careInstructions: "Spot clean with damp cloth or gentle dry clean only.",
    shortDescription: "",
    description: "",
    images: ["/products/Bag001.png"],
    isFeatured: false,
    isBestSeller: false,
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    productApi
      .getAll()
      .then((res) => {
        if (res.success && res.data) {
          setProducts(res.data);
        }
      })
      .catch((err) => console.error("Error loading products:", err))
      .finally(() => setLoading(false));
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || "",
      price: product.price || 1299,
      originalPrice: product.originalPrice || 1899,
      stock: product.stock || 50,
      category: product.category || "Royal Heritage Embroidery",
      fabric: product.fabric || "100% Heavy-GSM Belgian Flax Linen",
      embroideryType: product.embroideryType || "Multi-Head Computerized Zari & Velvet Applique",
      dimensions: product.dimensions || "15\"H x 16\"W x 5.5\"D",
      closure: product.closure || "Magnetic Brass Snap + Inner Zip Pocket",
      lining: product.lining || "Water-Resistant Organic Cotton Lining",
      careInstructions: product.careInstructions || "Spot clean or gentle dry clean only.",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      images: product.images || ["/products/Bag001.png"],
      isFeatured: !!product.isFeatured,
      isBestSeller: !!product.isBestSeller,
    });
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmItem) return;
    try {
      const res = await productApi.delete(deleteConfirmItem.id);
      if (res.success) {
        setProducts(products.filter((p) => p.id !== deleteConfirmItem.id));
        toast.success("Product deleted");
        setDeleteConfirmItem(null);
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      setUploadingImage(true);
      try {
        const res = await uploadApi.uploadImage(reader.result, "mavtar/products");
        if (res.success && res.data?.url) {
          setFormData((prev) => ({
            ...prev,
            images: [res.data.url, ...(prev.images || [])],
          }));
          toast.success("Image uploaded");
        }
      } catch (err) {
        toast.error("Upload failed");
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const res = await productApi.update(editingProduct.id, formData);
        if (res.success) {
          toast.success("Product updated");
          setIsModalOpen(false);
          fetchProducts();
        }
      } else {
        const res = await productApi.create(formData);
        if (res.success) {
          toast.success("Product added");
          setIsModalOpen(false);
          fetchProducts();
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  const categories = [
    "ALL",
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" || p.category === categoryFilter;

    const matchesStock =
      stockFilter === "ALL" ||
      (stockFilter === "IN_STOCK" && p.stock > 15) ||
      (stockFilter === "LOW_STOCK" && p.stock <= 15);

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="admin-products-page">
      
      {/* Header Bar */}
      <div className="page-header-bar">
        <div className="header-info">
          <h1 className="page-title">Linen Bags Catalog</h1>
          <p className="page-subtitle">
            Manage your store's handcrafted embroidered bags, pricing, and stock
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn-pill-primary">
          <Plus size={16} />
          <span>Add New Linen Bag</span>
        </button>
      </div>

      {/* Spacious, Thick Luxury Search & Filter Bar */}
      <div className="search-action-bar">
        {/* Top: Thick, Spacious Search Input */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search catalog by title, SKU (e.g. MVT-), or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearch("")}
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Bottom Controls Row: Filters + Grid/Row Switcher + Count */}
        <div className="search-filter-controls-row">
          <div className="filter-selects-group">
            <select
              className="admin-select-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              title="Filter by Category"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "ALL" ? "All Categories" : c}
                </option>
              ))}
            </select>

            <select
              className="admin-select-filter"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              title="Filter by Stock Status"
            >
              <option value="ALL">All Stock Levels</option>
              <option value="IN_STOCK">In Stock (&gt;15)</option>
              <option value="LOW_STOCK">Low Stock (≤15)</option>
            </select>
          </div>

          <div className="search-actions-right">
            {/* Workable Grid & Row View Toggle Buttons */}
            <div className="view-mode-toggle" title="Switch View Mode">
              <button
                type="button"
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid Cards View"
              >
                <LayoutGrid size={15} />
                <span>Grid</span>
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === "row" ? "active" : ""}`}
                onClick={() => setViewMode("row")}
                title="Row Cards View"
              >
                <LayoutList size={15} />
                <span>Row</span>
              </button>
            </div>

            <span className="count-indicator">
              <strong>{filteredProducts.length}</strong> of {products.length} bags
            </span>

            {(search || categoryFilter !== "ALL" || stockFilter !== "ALL") && (
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  setSearch("");
                  setCategoryFilter("ALL");
                  setStockFilter("ALL");
                }}
              >
                <X size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Products Display Container (Fully Responsive Grid & Table View) */}
      <div className="products-table-card">
        {loading ? (
          viewMode === "grid" ? (
            <SkeletonProductGrid count={6} />
          ) : (
            <div style={{ padding: "16px" }}>
              <SkeletonTable rows={7} cols={6} />
            </div>
          )
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>
            No products found matching your search.
          </div>
        ) : viewMode === "grid" ? (
          /* 1. Grid Cards View */
          <div className="luxury-products-container view-grid">
            {filteredProducts.map((p) => {
              const discountPct =
                p.originalPrice > p.price
                  ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                  : 0;

              return (
                <div key={p.id} className="admin-product-luxury-card">
                  {/* Top: Dedicated Image Showcase Media Box */}
                  <div className="card-media-box">
                    <img
                      src={p.images?.[0] || "/products/Bag001.png"}
                      alt={p.title}
                      className="card-product-img"
                      onError={(e) => {
                        e.target.src = "/products/Bag001.png";
                      }}
                    />
                    {p.isBestSeller && (
                      <span className="badge-corner-bestseller">Best Seller</span>
                    )}
                    <span className={`stock-badge-overlay ${p.stock > 15 ? "in-stock" : "low-stock"}`}>
                      <span className="status-dot" />
                      {p.stock > 15 ? `${p.stock} in stock` : `Only ${p.stock} left`}
                    </span>
                  </div>

                  {/* Body: Head Details & Pricing */}
                  <div className="card-body-content">
                    <div className="card-badges-line">
                      <span className="sku-chip">{p.sku || "MVT-7801"}</span>
                      <span className="cat-chip">{p.category}</span>
                    </div>

                    <h3 className="card-title">
                      <a
                        href={`/product/${p.slug || p.id}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View live on storefront"
                      >
                        {p.title}
                      </a>
                    </h3>

                    <div className="card-price-group">
                      <span className="card-price-main">₹{p.price?.toLocaleString()}</span>
                      {p.originalPrice > p.price && (
                        <span className="card-price-strike">₹{p.originalPrice?.toLocaleString()}</span>
                      )}
                      {discountPct > 0 && (
                        <span className="card-discount-tag">-{discountPct}%</span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Action Buttons */}
                  <div className="card-action-bar">
                    <a
                      href={`/product/${p.slug || p.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-card-action btn-preview"
                      title="Preview live on storefront"
                    >
                      <ExternalLink size={13} />
                      <span>Preview</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleOpenEdit(p)}
                      className="btn-card-action btn-edit"
                      title="Edit product"
                    >
                      <Edit2 size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmItem(p)}
                      className="btn-card-action btn-delete"
                      title="Delete product"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 2. Row View: One-Line Table with High-Contrast Scrollbar and Bottom Control Dock */
          <div className="products-table-wrapper">
            <div className="table-scroll-viewport" ref={tableScrollRef}>
              <table className="admin-products-table">
                <thead>
                  <tr>
                    <th className="th-product" style={{ minWidth: "300px" }}>Product</th>
                    <th className="th-category" style={{ minWidth: "180px" }}>Category</th>
                    <th className="th-stock" style={{ minWidth: "140px" }}>Stock</th>
                    <th className="th-price" style={{ minWidth: "150px" }}>Price</th>
                    <th className="th-badge" style={{ minWidth: "120px" }}>Badge</th>
                    <th className="th-actions" style={{ minWidth: "180px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => {
                    const discountPct =
                      p.originalPrice > p.price
                        ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
                        : 0;

                    return (
                      <tr key={p.id} className="admin-product-table-row">
                        {/* 1. Product (Thumb + Title + SKU in single line) */}
                        <td className="cell-product-info">
                          <div className="table-product-flex">
                            <div className="table-product-thumb">
                              <img
                                src={p.images?.[0] || "/products/Bag001.png"}
                                alt={p.title}
                                onError={(e) => {
                                  e.target.src = "/products/Bag001.png";
                                }}
                              />
                            </div>
                            <div className="table-title-sku">
                              <a
                                href={`/product/${p.slug || p.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="table-product-title"
                                title="View live on storefront"
                              >
                                {p.title}
                              </a>
                              <span className="table-sku-chip">{p.sku || "MVT-7801"}</span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Category */}
                        <td className="cell-category">
                          <span className="table-cat-badge">{p.category}</span>
                        </td>

                        {/* 3. Stock */}
                        <td className="cell-stock">
                          <span className={`table-stock-pill ${p.stock > 15 ? "in-stock" : "low-stock"}`}>
                            <span className="status-dot" />
                            <strong>{p.stock}</strong> units
                          </span>
                        </td>

                        {/* 4. Price */}
                        <td className="cell-price">
                          <div className="table-price-flex">
                            <span className="table-price-main">₹{p.price?.toLocaleString()}</span>
                            {p.originalPrice > p.price && (
                              <span className="table-price-strike">₹{p.originalPrice?.toLocaleString()}</span>
                            )}
                            {discountPct > 0 && (
                              <span className="table-discount-chip">-{discountPct}%</span>
                            )}
                          </div>
                        </td>

                        {/* 5. Badge */}
                        <td className="cell-badge">
                          {p.isBestSeller ? (
                            <span className="table-badge-bestseller">Best Seller</span>
                          ) : (
                            <span className="table-badge-regular">Standard</span>
                          )}
                        </td>

                        {/* 6. Actions */}
                        <td className="cell-actions" style={{ textAlign: "right" }}>
                          <div className="table-actions-group">
                            <a
                              href={`/product/${p.slug || p.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-tbl-action btn-tbl-preview"
                              title="Preview live on storefront"
                            >
                              <ExternalLink size={13} />
                              <span>View</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(p)}
                              className="btn-tbl-action btn-tbl-edit"
                              title="Edit product"
                            >
                              <Edit2 size={13} />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmItem(p)}
                              className="btn-tbl-action btn-tbl-delete"
                              title="Delete product"
                            >
                              <Trash2 size={13} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Scrollbar Dock & Interactive Navigation Controls */}
            <div className="table-scroll-dock">
              <span className="dock-count">
                Showing <strong>{filteredProducts.length}</strong> one-line rows
              </span>
              <div className="dock-actions-row">
                <span className="dock-hint">
                  ⇄ Scroll table:
                </span>
                <button
                  type="button"
                  className="dock-scroll-arrow-btn"
                  onClick={() => handleScrollTable(-240)}
                  title="Scroll Left"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="dock-scroll-arrow-btn"
                  onClick={() => handleScrollTable(240)}
                  title="Scroll Right"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* In-App Confirmation Modal (Zero Browser window.confirm) */}
      {deleteConfirmItem && (
        <div
          className="modal-backdrop"
          onClick={() => setDeleteConfirmItem(null)}
        >
          <div
            className="delete-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="delete-modal-icon">
              <AlertTriangle size={24} />
            </div>
            <h3>Delete Product?</h3>
            <p>
              Are you sure you want to remove <strong>"{deleteConfirmItem.title}"</strong> from the catalog?
            </p>
            <div className="delete-modal-actions">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="btn-cancel-action"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="btn-confirm-delete-action"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Atelier Edit/Create Modal */}
      {isModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="modal-card">
            <div className="modal-header">
              <div className="modal-header-titles">
                <span className="modal-eyebrow">Catalog Atelier</span>
                <h2 className="modal-title">
                  {editingProduct ? "Edit Linen Bag" : "Add New Linen Bag"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="close-btn"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="modal-body">
                {/* Product Title */}
                <div className="form-group">
                  <label>Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Royal Haathi Emerald Linen Tote"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                {/* Price & MRP Row */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Original MRP (₹)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    />
                  </div>
                </div>

                {/* Stock & Fabric Row */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Stock Count</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Royal Heritage Embroidery">Royal Heritage Embroidery</option>
                      <option value="Everyday Minimal Luxury">Everyday Minimal Luxury</option>
                      <option value="Festive & Bridal Keepsakes">Festive & Bridal Keepsakes</option>
                      <option value="Ceremonial Velvet Applique">Ceremonial Velvet Applique</option>
                    </select>
                  </div>
                </div>

                {/* Dimensions & Closure */}
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Dimensions</label>
                    <input
                      type="text"
                      placeholder='e.g. 15"H x 16"W x 5.5"D'
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Closure Type</label>
                    <input
                      type="text"
                      placeholder="e.g. Magnetic Brass Snap"
                      value={formData.closure}
                      onChange={(e) => setFormData({ ...formData, closure: e.target.value })}
                    />
                  </div>
                </div>

                {/* Image Upload Row */}
                <div className="form-group">
                  <label>Primary Bag Image</label>
                  <div className="image-upload-wrapper">
                    {formData.images?.[0] && (
                      <img
                        src={formData.images[0]}
                        alt="Preview"
                        className="preview-thumb"
                        onError={(e) => {
                          e.target.src = "/products/Bag001.png";
                        }}
                      />
                    )}
                    <input
                      type="text"
                      placeholder="Image URL or upload below"
                      value={formData.images?.[0] || ""}
                      onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    />
                    <label className="upload-btn-label">
                      <Upload size={14} />
                      <span>{uploadingImage ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        style={{ display: "none" }}
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>

                {/* Badges Toggles */}
                <div className="badge-toggles-grid">
                  <label className={`toggle-card ${formData.isBestSeller ? "active" : ""}`}>
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    />
                    <div className="toggle-info">
                      <span className="toggle-title">Best Seller Edition</span>
                      <span className="toggle-desc">Highlights on storefront</span>
                    </div>
                  </label>

                  <label className={`toggle-card ${formData.isFeatured ? "active" : ""}`}>
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                    <div className="toggle-info">
                      <span className="toggle-title">Featured Showcase</span>
                      <span className="toggle-desc">Shows in hero curation</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingProduct ? "Save Changes" : "Create Linen Bag"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;
