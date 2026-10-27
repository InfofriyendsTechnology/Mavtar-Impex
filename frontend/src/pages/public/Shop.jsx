import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../../components/ProductCard";
import { productApi } from "../../services/api";
import "./Shop.scss";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const selectedCategory = searchParams.get("category") || "all";
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState("featured");

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
    <div className="shop-page">
      
      {/* Header Banner */}
      <div className="shop-header-banner">
        <span className="banner-tag">Catalog</span>
        <h1>Handcrafted Linen Bags</h1>
        <p>Explore our collection of pure natural flax linen totes, everyday shoppers, and bespoke festive keepsakes.</p>
      </div>

      <div className="shop-layout-split">
        
        {/* Filters Sidebar */}
        <aside className="shop-sidebar">
          <div className="filter-card">
            
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="search-box">
              <input
                type="text"
                placeholder="Search bags, motifs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={14} className="search-icon" />
            </form>

            {/* Categories */}
            <div className="filter-group">
              <div className="group-title">Categories</div>
              <div className="categories-nav">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={selectedCategory === cat.slug ? "active" : ""}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="price-range-group">
              <div className="price-title-row">
                <span>Max Price</span>
                <span className="active-price">Up to ₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="600"
                max="2000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="range-limits">
                <span>₹600</span>
                <span>₹1,300</span>
                <span>₹2,000</span>
              </div>
            </div>

            {/* Reset Button */}
            <button onClick={resetFilters} className="btn-reset-filters">
              <RotateCcw size={12} />
              <span>Reset Filters</span>
            </button>

          </div>
        </aside>

        {/* Products Grid Section */}
        <main className="shop-main-content">
          
          {/* Top Sort & Count Toolbar */}
          <div className="shop-toolbar">
            <div className="count-text">
              Showing <strong>{filteredProducts.length}</strong> handcrafted linen bags
            </div>

            <div className="sort-select-box">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="shop-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="skeleton-card" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <h3>No bags found</h3>
              <p>Try adjusting your search criteria or price slider to find more styles.</p>
              <button onClick={resetFilters}>Reset Filters</button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="shop-grid"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}

        </main>
      </div>

    </div>
  );
};

export default Shop;
