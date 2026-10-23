import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { productApi } from "../../services/api";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const selectedCategory = searchParams.get("category") || "all";
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState("featured");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = [
    { name: "All Linen Bags", slug: "all" },
    { name: "Royal Heritage Embroidery", slug: "royal-heritage" },
    { name: "Everyday Minimal Linen", slug: "everyday-minimal" },
    { name: "Festive & Wedding Gifting", slug: "festive-gifting" },
    { name: "Artisanal Potlis & Clutches", slug: "potlis-clutches" },
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchProducts = () => {
    setLoading(true);
    const params = {};
    if (selectedCategory && selectedCategory !== "all") {
      params.category = selectedCategory;
    }
    if (searchQuery) {
      params.search = searchQuery;
    }
    if (sortBy === "price-low") params.sort = "price-low";
    if (sortBy === "price-high") params.sort = "price-high";
    if (sortBy === "popular") params.sort = "popular";

    productApi
      .getAll(params)
      .then((res) => {
        if (res.success && res.data) {
          setProducts(res.data);
        }
      })
      .catch((err) => console.error("Error fetching shop products:", err))
      .finally(() => setLoading(false));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const filteredProducts = products.filter((p) => Number(p.price) <= priceRange);

  const handleCategorySelect = (slug) => {
    if (slug === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", slug);
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange(2000);
    setSortBy("featured");
    searchParams.delete("category");
    searchParams.delete("search");
    setSearchParams(searchParams);
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-zinc-950 text-linen-100 rounded-xl p-8 sm:p-10 border border-gold-500/30">
        <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
          Artisanal Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-1">
          Explore Handcrafted Linen Bags
        </h1>
        <p className="text-sm text-linen-300 mt-2 max-w-xl font-light">
          Browse our collection of royal embroidered elephant tote bags, pure raw linen shoppers, and festive wedding potlis. Selling price: ₹600 to ₹2,000.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full flex items-center justify-between bg-white border border-linen-300 p-3 rounded-lg text-sm font-semibold text-zinc-950"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters & Categories</span>
            </span>
            <span className="text-xs text-gold-600 font-bold">{filteredProducts.length} Products</span>
          </button>

          <div className={`space-y-6 ${showMobileFilters ? "block" : "hidden lg:block"} bg-white p-5 rounded-lg border border-linen-200 shadow-sm`}>
            
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search embroidery, style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-linen-50 border border-linen-300 rounded-md pl-9 pr-3 py-2 text-xs text-linen-900 focus:outline-none focus:border-gold-500"
              />
              <Search className="w-4 h-4 text-linen-400 absolute left-3 top-2.5" />
            </form>

            {/* Categories */}
            <div className="space-y-2">
              <h3 className="font-serif text-base font-bold text-zinc-950 border-b border-linen-100 pb-2">
                Categories
              </h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-zinc-900 text-gold-300 font-semibold"
                        : "text-linen-700 hover:bg-linen-100"
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider: ₹600 - ₹2,000 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-linen-100 pb-2">
                <h3 className="font-serif text-base font-bold text-zinc-950">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-zinc-900">Up to ₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="600"
                max="2000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-zinc-900 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-linen-500 font-medium">
                <span>₹600</span>
                <span>₹1,300</span>
                <span>₹2,000</span>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="w-full border border-linen-300 hover:border-gold-500 text-linen-700 py-2 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>

          </div>
        </aside>

        {/* Products Grid Section */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Top Sort & Count Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-linen-200">
            <div className="text-xs text-linen-600">
              Showing <strong className="text-zinc-950">{filteredProducts.length}</strong> handcrafted linen bags
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-linen-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-linen-50 border border-linen-300 rounded px-2.5 py-1 text-xs text-linen-800 font-medium focus:outline-none focus:border-gold-500 cursor-pointer"
              >
                <option value="featured">Featured Artisanal</option>
                <option value="price-low">Price: Low to High (₹600+)</option>
                <option value="price-high">Price: High to Low (₹2,000)</option>
                <option value="popular">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-linen-100 rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center space-y-4 border border-linen-200">
              <h3 className="font-serif text-2xl font-bold text-zinc-950">No linen bags found</h3>
              <p className="text-sm text-linen-600 max-w-md mx-auto">
                Try adjusting your price filter or search query to explore other styles from our collection.
              </p>
              <button
                onClick={resetFilters}
                className="bg-zinc-900 text-gold-200 px-6 py-2 rounded text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

export default Shop;
