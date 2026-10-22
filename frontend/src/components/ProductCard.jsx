import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const mainImage = product.images?.[0] || "/products/royal-elephant-green-tote.jpg";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group bg-white rounded-xl overflow-hidden border border-linen-200 hover:border-gold-500/50 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
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
            <span className="bg-red-800 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Pill on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-white/95 text-emerald-950 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-gold-600" />
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
            <h3 className="font-serif text-lg font-bold text-emerald-950 group-hover:text-gold-700 transition-colors line-clamp-1">
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

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => addToCart(product, 1)}
              className="bg-emerald-950 hover:bg-emerald-900 text-white px-3 py-2 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer font-semibold"
              title="Add to shopping bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs font-semibold">Add</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
