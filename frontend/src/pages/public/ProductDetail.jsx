import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, ShoppingBag, Zap, ShieldCheck, Check, MapPin, MessageSquare } from "lucide-react";
import { productApi } from "../../services/api";
import { useCart } from "../../context/CartContext";
import { SkeletonProductDetail } from "../../components/common/Skeleton";
import toast from "react-hot-toast";
import "./ProductDetail.scss";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);

  useEffect(() => {
    setLoading(true);
    productApi
      .getById(id)
      .then((res) => {
        if (res.success && res.data) {
          setProduct(res.data);
          setSelectedImage(res.data.images?.[0] || "/products/Bag001.png");
        }
      })
      .catch((err) => {
        console.error("Product load error:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <SkeletonProductDetail />;
  }

  if (!product) {
    return (
      <div className="product-detail-page text-center py-20">
        <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.4rem", fontWeight: 600 }}>Product Not Found</h2>
        <p style={{ color: "#71717A", marginTop: 8 }}>The requested handcrafted bag could not be retrieved.</p>
        <Link to="/shop" style={{ display: "inline-block", marginTop: 16, background: "#18181B", color: "#FFFFFF", padding: "10px 24px", borderRadius: 9999, fontSize: "0.85rem", fontWeight: 600 }}>
          Browse Collection
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus("Delivery available in 3-5 business days. Free shipping eligible.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <div className="product-detail-page animate-fadeIn">
      
      {/* Breadcrumb Trail */}
      <nav className="breadcrumb-trail">
        <Link to="/">Home</Link>
        <span className="sep">/</span>
        <Link to="/shop">Collection</Link>
        <span className="sep">/</span>
        <span className="current-item">{product.title}</span>
      </nav>

      {/* Main Showcase Grid */}
      <div className="detail-grid">
        
        {/* Left: Gallery Column */}
        <div className="gallery-column">
          <div className="main-stage-img-wrapper">
            <img
              src={selectedImage}
              alt={product.title}
              className="main-img"
              onError={(e) => {
                e.target.src = "/products/Bag001.png";
              }}
            />
            {discountPercent > 0 && (
              <span className="discount-badge">{discountPercent}% OFF</span>
            )}
            <span className="artisan-badge">Handcrafted in Surat</span>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="thumbnails-strip">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`thumb-btn ${selectedImage === img ? "active" : ""}`}
                >
                  <img
                    src={img}
                    alt=""
                    onError={(e) => {
                      e.target.src = "/products/Bag001.png";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Specs & Actions Column */}
        <div className="specs-column">
          
          <div className="header-block">
            <span className="category-tag">{product.category || "Artisanal Linen Collection"}</span>
            <h1 className="product-title">{product.title}</h1>
            <div className="rating-sku-row">
              <div className="stars-group">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: 15, height: 15, fill: "currentColor" }} />
                ))}
              </div>
              <span className="review-text">
                4.9 ({product.reviewsCount || 28} Verified Reviews)
              </span>
              <span className="sku-tag">
                SKU: {product.sku || "MVT-7841"}
              </span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="price-card">
            <div className="price-row">
              <span className="current-price">₹{Number(product.price).toLocaleString("en-IN")}</span>
              {product.originalPrice > product.price && (
                <span className="original-price">₹{Number(product.originalPrice).toLocaleString("en-IN")}</span>
              )}
              {discountPercent > 0 && (
                <span className="saving-chip">
                  Save ₹{Number(product.originalPrice - product.price).toLocaleString("en-IN")} ({discountPercent}% OFF)
                </span>
              )}
            </div>
            <span className="tax-note">Inclusive of GST & Pan-India Insured Dispatch</span>
          </div>

          {/* Description */}
          <p className="description-text">
            {product.description || "Indulge in authentic Gujarati artisanal craftsmanship. Crafted from dense 100% natural pure flax linen with intricate double-reinforced embroidery, built for luxury weddings, daily elegance, and timeless durability."}
          </p>

          {/* Specifications Table */}
          <div className="specs-table-card">
            <div className="specs-header">Handcrafted Bag Specifications</div>
            <div className="specs-body">
              <div className="spec-row">
                <span className="spec-name">Fabric</span>
                <span className="spec-val">{product.fabric || "100% Pure Natural Linen"}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Embroidery</span>
                <span className="spec-val">{product.embroideryType || "Computerized Zari & Velvet Applique"}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Dimensions</span>
                <span className="spec-val">{product.dimensions || "15\"H x 16\"W x 5.5\"D"}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Closure</span>
                <span className="spec-val">{product.closure || "Magnetic Snap + Inner Zipper"}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Inner Lining</span>
                <span className="spec-val">{product.lining || "Water-Resistant Cotton Twill"}</span>
              </div>
              <div className="spec-row">
                <span className="spec-name">Care</span>
                <span className="spec-val">{product.careInstructions || "Gentle spot clean or dry clean only"}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="actions-container">
            <div className="counter-and-add-row">
              <div className="qty-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="step-btn"
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="step-btn"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="btn-add-to-cart"
              >
                <ShoppingBag style={{ width: 17, height: 17 }} />
                <span>Add to Bag • ₹{Number(product.price * quantity).toLocaleString("en-IN")}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleBuyNow}
              className="btn-buy-now"
            >
              <Zap style={{ width: 16, height: 16 }} />
              <span>Instant Buy with 1-Click</span>
            </button>

            <a
              href={`https://wa.me/919512753471?text=Hi%20Mavtar%20Impex,%20I%20have%20an%20inquiry%20regarding%20${encodeURIComponent(product.title)}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-inquire-link"
            >
              <MessageSquare style={{ width: 14, height: 14 }} />
              <span>Have Custom Monogram Requirements? Ask on WhatsApp</span>
            </a>
          </div>

          {/* Pincode Checker */}
          <div className="pincode-checker-block">
            <form onSubmit={handlePincodeCheck} className="pin-form">
              <div className="pin-input-wrap">
                <MapPin className="pin-icon" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Delivery Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="pin-input"
                />
              </div>
              <button type="submit" className="btn-check-pin">
                Check Delivery
              </button>
            </form>
            {pincodeStatus && (
              <div className="pin-status-result">
                <Check style={{ width: 14, height: 14 }} />
                <span>{pincodeStatus}</span>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetail;