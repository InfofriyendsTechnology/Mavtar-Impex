import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, ShoppingBag, Zap, ShieldCheck, Truck, RefreshCw, Check, Heart, MapPin } from "lucide-react";
import { productApi } from "../../services/api";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

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
          setSelectedImage(res.data.images?.[0] || "/products/royal-elephant-green-tote.jpg");
        }
      })
      .catch((err) => {
        console.error("Product load error:", err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="w-12 h-12 border-4 border-zinc-900 border-t-gold-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-zinc-950">Product Not Found</h2>
        <p className="text-sm text-linen-600">The requested linen bag is no longer available.</p>
        <Link to="/shop" className="inline-block bg-zinc-900 text-gold-200 px-6 py-2 rounded text-xs font-semibold">
          Return to Shop
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

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-linen-500 flex items-center gap-2">
        <Link to="/" className="hover:text-zinc-900">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-zinc-900">Bags</Link>
        <span>/</span>
        <span className="text-zinc-950 font-medium truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Gallery - 6 Columns */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-[4/5] rounded-xl overflow-hidden bg-linen-100 border border-linen-200 shadow-sm relative">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-all duration-300"
              onError={(e) => {
                e.target.src = "/products/royal-elephant-green-tote.jpg";
              }}
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-ruby-700 text-white text-xs font-bold px-2.5 py-1 rounded shadow">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === img ? "border-gold-500 shadow-md" : "border-linen-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/products/royal-elephant-green-tote.jpg";
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details - 6 Columns */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase text-gold-600 mb-1">
              {product.category || "Artisanal Linen Collection"}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-linen-700">
                4.9 ({product.reviewsCount || 28} Verified Reviews)
              </span>
              <span className="text-xs text-zinc-700 bg-zinc-50 px-2 py-0.5 rounded font-medium border border-zinc-200">
                SKU: {product.sku || "MAVTAR-7841"}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-lg bg-linen-100/70 border border-linen-200 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-zinc-950">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-base text-linen-400 line-through">₹{product.originalPrice}</span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-ruby-700 bg-ruby-50 border border-ruby-200 px-2 py-0.5 rounded">
                  Save ₹{product.originalPrice - product.price} ({discountPercent}% OFF)
                </span>
              )}
            </div>
            <p className="text-[11px] text-linen-500">
              Inclusive of all taxes. Free shipping Pan-India on orders above ₹999.
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-linen-700 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Specifications Table */}
          <div className="border border-linen-200 rounded-lg overflow-hidden text-xs">
            <div className="bg-linen-100/80 px-4 py-2 font-bold text-zinc-950 uppercase tracking-wider">
              Handcrafted Specifications
            </div>
            <div className="divide-y divide-linen-100 bg-white">
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-linen-500">Fabric</span>
                <span className="col-span-2 text-linen-900 font-medium">{product.fabric || "100% Pure Flax Linen"}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-linen-500">Embroidery</span>
                <span className="col-span-2 text-linen-900 font-medium">{product.embroideryType || "Computerized Zari & Velvet Applique"}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-linen-500">Dimensions</span>
                <span className="col-span-2 text-linen-900 font-medium">{product.dimensions || "15\"H x 16\"W x 5.5\"D"}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-linen-500">Closure</span>
                <span className="col-span-2 text-linen-900 font-medium">{product.closure || "Magnetic Snap + Inner Zipper"}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-linen-500">Inner Lining</span>
                <span className="col-span-2 text-linen-900 font-medium">{product.lining || "Water-Resistant Organic Cotton"}</span>
              </div>
              <div className="grid grid-cols-3 px-4 py-2.5">
                <span className="font-semibold text-linen-500">Care</span>
                <span className="col-span-2 text-linen-900">{product.careInstructions || "Spot clean or gentle dry clean only"}</span>
              </div>
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-linen-300 rounded-md bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-linen-700 hover:bg-linen-100 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-linen-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-linen-700 hover:bg-linen-100 text-sm font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-zinc-900 hover:bg-black text-white py-3.5 px-6 rounded-full font-semibold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-zinc-300" />
                <span>Add to Bag • ₹{product.price * quantity}</span>
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 py-3 px-6 rounded-full font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-zinc-700" />
              <span>Buy Now with 1-Click</span>
            </button>
          </div>

          {/* Pincode Checker */}
          <div className="pt-4 border-t border-linen-200">
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-white border border-linen-300 rounded-md pl-8 pr-3 py-2 text-xs focus:outline-none focus:border-gold-500"
                />
                <MapPin className="w-4 h-4 text-linen-400 absolute left-2.5 top-2.5" />
              </div>
              <button
                type="submit"
                className="bg-linen-200 hover:bg-linen-300 text-zinc-950 px-4 py-2 rounded-md text-xs font-semibold transition-colors"
              >
                Check Delivery
              </button>
            </form>
            {pincodeStatus && (
              <p className="text-xs text-zinc-800 font-medium mt-2 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-zinc-600" />
                <span>{pincodeStatus}</span>
              </p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetail;
