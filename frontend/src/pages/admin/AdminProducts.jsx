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

      {/* Products Table Card */}
      <div className="products-table-card">
        {loading ? (
          <div style={{ padding: "60px 0", textAlign: "center" }}>
            <div style={{ width: 32, height: 32, border: "3px solid #0B4633", borderTopColor: "#C5A059", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>
            No products found matching your search.
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Bag Image</th>
                  <th>Title & SKU</th>
                  <th>Category</th>
                  <th>Selling Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
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
                      <div className="prod-sku">{p.sku || "MAVTAR-7801"}</div>
                    </td>
                    <td style={{ color: "#4B5563" }}>{p.category}</td>
                    <td>
                      <div className="price-tag">₹{p.price}</div>
                      {p.originalPrice > p.price && (
                        <div style={{ fontSize: "0.72rem", color: "#9CA3AF", textDecoration: "line-through" }}>
                          ₹{p.originalPrice}
                        </div>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${p.stock > 15 ? "in-stock" : "low-stock"}`}>
                        {p.stock} in stock
                      </span>
                    </td>
                    <td>
                      {p.isBestSeller && <span className="badge featured">Best Seller</span>}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="action-icon-btn"
                        title="Edit product"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.title)}
                        className="action-icon-btn delete"
                        title="Delete product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingProduct ? "Edit Linen Bag" : "Add New Linen Bag"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
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

              <div className="form-row-3">
                <div className="form-group">
                  <label>Price (₹600 - ₹2000)</label>
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
                <div className="form-group">
                  <label>Stock Count</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-row">
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
                <div className="form-group">
                  <label>Fabric</label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Embroidery Style</label>
                <input
                  type="text"
                  value={formData.embroideryType}
                  onChange={(e) => setFormData({ ...formData, embroideryType: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Photo URL / Upload</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    placeholder="/products/bag-image.jpg or Cloudinary URL"
                    value={formData.images[0] || ""}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    style={{ flex: 1 }}
                  />
                  <label className="btn-pill-secondary" style={{ height: "42px", padding: "0 14px", cursor: "pointer" }}>
                    <Upload size={14} />
                    <span>{uploadingImage ? "Uploading..." : "Upload"}</span>
                    <input type="file" accept="image/*" onChange={handleImageFileUpload} style={{ display: "none" }} />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Full Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", gap: "20px", paddingTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  <span>Show as Featured</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                  />
                  <span>Mark as Best Seller</span>
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-pill-secondary">
                  <span>Cancel</span>
                </button>
                <button type="submit" className="btn-pill-primary">
                  <span>Save Product</span>
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
