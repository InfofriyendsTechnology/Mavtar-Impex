import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  X,
  ShoppingBag,
} from "lucide-react";
import { productApi, uploadApi } from "../../services/api";
import toast from "react-hot-toast";
import "./AdminProducts.scss";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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
    images: ["/products/royal-elephant-green-tote.jpg"],
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
      images: product.images || ["/products/royal-elephant-green-tote.jpg"],
      isFeatured: !!product.isFeatured,
      isBestSeller: !!product.isBestSeller,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await productApi.delete(id);
      if (res.success) {
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");
      }
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    setUploadingImage(true);
    try {
      const res = await uploadApi.uploadImage(data);
      if (res.success && res.data?.url) {
        setFormData((prev) => ({
          ...prev,
          images: [res.data.url, ...prev.images],
        }));
        toast.success("Image uploaded!");
      }
    } catch (err) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          images: [reader.result, ...prev.images],
        }));
        toast.success("Image preview loaded!");
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const res = await productApi.update(editingProduct.id, formData);
        if (res.success) {
          toast.success("Product updated successfully");
          setIsModalOpen(false);
          fetchProducts();
        }
      } else {
        const res = await productApi.create(formData);
        if (res.success) {
          toast.success("New linen bag added to catalog!");
          setIsModalOpen(false);
          fetchProducts();
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save product");
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase()) ||
      p.sku?.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* Filter / Search Bar */}
      <div className="search-action-bar">
        <div className="search-input-wrapper">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by title, SKU, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <span className="count-indicator">
          Showing <strong>{filteredProducts.length}</strong> of {products.length} products
        </span>
      </div>

      {/* Products Display Card (Desktop Table + Mobile Clean Card Rows) */}
      <div className="products-table-card">
        {loading ? (
          <div style={{ padding: "60px 0", textAlign: "center" }}>
            <div style={{ width: 32, height: 32, border: "3px solid #E4E4E7", borderTopColor: "#18181B", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>
            No products found matching your search.
          </div>
        ) : (
          <>
            {/* Desktop Table View (Spacious, fixed-width columns) */}
            <div className="desktop-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: "64px" }}>Bag</th>
                    <th>Product Title & Code</th>
                    <th style={{ width: "170px" }}>Category</th>
                    <th style={{ width: "130px" }}>Selling Price</th>
                    <th style={{ width: "130px" }}>Stock</th>
                    <th style={{ width: "110px" }}>Edition</th>
                    <th style={{ width: "100px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <img
                          src={p.images?.[0] || "/products/royal-elephant-green-tote.jpg"}
                          alt={p.title}
                          className="product-thumb"
                          onError={(e) => {
                            e.target.src = "/products/royal-elephant-green-tote.jpg";
                          }}
                        />
                      </td>
                      <td>
                        <div className="prod-title">{p.title}</div>
                        <span className="sku-chip">{p.sku || "MVT-7801"}</span>
                      </td>
                      <td>
                        <span className="cat-chip">{p.category}</span>
                      </td>
                      <td>
                        <span className="price-tag">₹{p.price}</span>
                        {p.originalPrice > p.price && (
                          <span className="price-strike">₹{p.originalPrice}</span>
                        )}
                      </td>
                      <td>
                        <span className={`stock-pill ${p.stock > 15 ? "in-stock" : "low-stock"}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td>
                        {p.isBestSeller ? (
                          <span className="badge-bestseller">Best Seller</span>
                        ) : (
                          <span className="badge-standard">Standard</span>
                        )}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div className="action-buttons-wrap">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="action-icon-btn"
                            title="Edit product"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            className="action-icon-btn delete"
                            title="Delete product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Responsive Card Rows (Zero horizontal scroll, zero text overload) */}
            <div className="mobile-products-list">
              {filteredProducts.map((p) => (
                <div key={p.id} className="mobile-product-card">
                  <img
                    src={p.images?.[0] || "/products/royal-elephant-green-tote.jpg"}
                    alt={p.title}
                    className="mobile-card-thumb"
                    onError={(e) => {
                      e.target.src = "/products/royal-elephant-green-tote.jpg";
                    }}
                  />

                  <div className="mobile-card-info">
                    <div className="mobile-card-title">{p.title}</div>

                    <div className="mobile-card-chips">
                      <span className="sku-chip">{p.sku || "MVT-7801"}</span>
                      <span className="cat-chip">{p.category}</span>
                    </div>

                    <div className="mobile-card-bottom">
                      <div className="mobile-card-price">
                        <span className="curr-price">₹{p.price}</span>
                        {p.originalPrice > p.price && (
                          <span className="orig-price">₹{p.originalPrice}</span>
                        )}
                      </div>
                      <span className={`stock-pill ${p.stock > 15 ? "in-stock" : "low-stock"}`}>
                        {p.stock} units
                      </span>
                    </div>
                  </div>

                  <div className="mobile-card-actions">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="action-icon-btn"
                      title="Edit product"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="action-icon-btn delete"
                      title="Delete product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modern Atelier Modal */}
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
                    <label>Fabric Grade</label>
                    <input
                      type="text"
                      placeholder="e.g. 100% Belgian Flax"
                      value={formData.fabric}
                      onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Royal Heritage Embroidery">Royal Heritage Embroidery</option>
                    <option value="Everyday Minimal Linen">Everyday Minimal Linen</option>
                    <option value="Festive & Wedding Gifting">Festive & Wedding Gifting</option>
                    <option value="Artisanal Potlis & Clutches">Artisanal Potlis & Clutches</option>
                  </select>
                </div>

                {/* Embroidery Style */}
                <div className="form-group">
                  <label>Embroidery Style & Technique</label>
                  <input
                    type="text"
                    placeholder="e.g. Multi-Head Computerized Zari & Velvet Applique"
                    value={formData.embroideryType}
                    onChange={(e) => setFormData({ ...formData, embroideryType: e.target.value })}
                  />
                </div>

                {/* Photo URL & Upload with Live Thumbnail */}
                <div className="form-group">
                  <label>Product Image / Media Asset</label>
                  <div className="image-upload-wrapper">
                    {formData.images?.[0] && (
                      <img
                        src={formData.images[0]}
                        alt="Preview"
                        className="preview-thumb"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    <input
                      type="text"
                      placeholder="/products/bag-image.jpg or CDN link"
                      value={formData.images[0] || ""}
                      onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    />
                    <label className="upload-btn-label">
                      <Upload size={13} />
                      <span>{uploadingImage ? "Uploading..." : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>

                {/* Short Headline */}
                <div className="form-group">
                  <label>Short Headline</label>
                  <input
                    type="text"
                    placeholder="Brief 1-sentence luxury artisan summary"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  />
                </div>

                {/* Full Description */}
                <div className="form-group">
                  <label>Craftsmanship & Detailing</label>
                  <textarea
                    rows={2}
                    placeholder="Detailed craftsmanship, weave texture, and closure details..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Interactive Placement Toggles */}
                <div className="form-group">
                  <label>Merchandising Placement</label>
                  <div className="badge-toggles-grid">
                    <label className={`toggle-card ${formData.isFeatured ? "active" : ""}`}>
                      <input
                        type="checkbox"
                        checked={formData.isFeatured}
                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      />
                      <div className="toggle-info">
                        <span className="toggle-title">Featured Showcase</span>
                        <span className="toggle-desc">Display in hero collections</span>
                      </div>
                    </label>

                    <label className={`toggle-card ${formData.isBestSeller ? "active" : ""}`}>
                      <input
                        type="checkbox"
                        checked={formData.isBestSeller}
                        onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                      />
                      <div className="toggle-info">
                        <span className="toggle-title">Best Seller Tag</span>
                        <span className="toggle-desc">Highlight with top artisan badge</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Sticky Footer Action Bar */}
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-pill-secondary"
                >
                  <span>Cancel</span>
                </button>
                <button type="submit" className="btn-pill-primary">
                  <span>{editingProduct ? "Save Changes" : "Create Product"}</span>
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
