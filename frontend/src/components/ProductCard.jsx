import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, Eye } from "lucide-react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const mainImage = product.images?.[0] || "/products/royal-elephant-green-tote.jpg";

  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-linen-200/80 hover:border-gold-500/40 hover:shadow-luxury transition-all duration-300 flex flex-col h-full">
      
      {/* Image container */}
      <Link to={`/product/${product.slug || product.id}`} className="relative block overflow-hidden bg-linen-100 aspect-[4/5]">
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/products/royal-elephant-green-tote.jpg";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-emerald-950 text-gold-300 text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
              Best Seller
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-ruby-700 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Pill on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-emerald-950 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </span>
        </div>
      </Link>

      {/* Info Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold tracking-wider uppercase text-gold-600">
            {product.category || "Artisanal Linen"}
          </div>

          <Link to={`/product/${product.slug || product.id}`} className="block">
            <h3 className="font-serif text-lg font-bold text-emerald-950 hover:text-emerald-800 transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-linen-600 line-clamp-2">
            {product.shortDescription || product.description}
          </p>
        </div>

        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating || 5) ? "fill-current" : "stroke-current text-linen-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-linen-500 font-medium ml-1">
              ({product.reviewsCount || 18})
            </span>
          </div>

          {/* Pricing & Add to cart button */}
          <div className="flex items-center justify-between pt-2 border-t border-linen-100">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-emerald-950">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-linen-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>

            <button
              onClick={() => addToCart(product, 1)}
              className="bg-emerald-900 hover:bg-emerald-800 text-gold-200 p-2.5 rounded-md transition-colors shadow-sm hover:shadow flex items-center justify-center gap-1.5 group/btn"
              title="Add to shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
