import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  const mainImage = product.images?.[0] || "/products/Bag001.png";

  return (
    <div className="product-card-wrap">
      {/* Image container */}
      <Link to={`/product/${product.slug || product.id}`} className="product-media-link">
        <img
          src={mainImage}
          alt={product.title}
          onError={(e) => {
            e.target.src = "/products/Bag001.png";
          }}
        />

        {/* Badges */}
        <div className="badge-stack">
          {product.isBestSeller && <span className="badge-seller">Best Seller</span>}
          {discountPercent > 0 && <span className="badge-discount">{discountPercent}% OFF</span>}
        </div>
      </Link>

      {/* Info Container */}
      <div className="product-body">
        <div className="product-meta-head">
          <div className="product-category-slug">{product.category || "Artisanal Linen"}</div>

          <Link to={`/product/${product.slug || product.id}`} className="product-link-title">
            <h3 className="product-title">{product.title}</h3>
          </Link>

          <p className="product-description-snippet">
            {product.shortDescription || product.description}
          </p>
        </div>

        <div className="product-footer-row">
          <div className="price-cluster">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="strike-price">₹{product.originalPrice}</span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="btn-add-cart"
            title="Add to shopping bag"
          >
            <ShoppingBag size={13} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
