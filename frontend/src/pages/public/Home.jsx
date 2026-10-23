import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Play, ShieldCheck, Heart, Award, CheckCircle2, Star, Video } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { productApi } from "../../services/api";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi
      .getAll({ sort: "popular" })
      .then((res) => {
        if (res.success && res.data) {
          setFeaturedProducts(res.data.slice(0, 4));
        }
      })
      .catch((err) => console.error("Error loading products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. LUXURY HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0E0F12] text-zinc-100 min-h-[85vh] flex items-center border-b border-zinc-800">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-zinc-800/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-zinc-700/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                <span>Handcrafted Luxury From Surat, Gujarat</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08]">
                Pure Linen. <br />
                <span className="italic font-serif text-zinc-400">Royal Zari</span> Embroidery.
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Elevating sustainable everyday luxury. Handcrafted heavy-GSM Belgian flax linen tote bags, embellished with multi-head royal elephant embroidery, metallic zari, and velvet applique.
              </p>

              {/* Price Callout */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs tracking-wide text-zinc-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-zinc-400" />
                  <span>Masterpiece Collection: ₹600 - ₹2,000</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-zinc-400" />
                  <span>Pan-India Free Delivery Above ₹999</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-8 py-4 rounded-full tracking-wide text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#workshop-video"
                  className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-medium px-6 py-4 rounded-full text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 text-zinc-400 fill-zinc-400" />
                  <span>Watch the Craft (Workshop Video)</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-zinc-700/30 to-zinc-800/30 rounded-2xl blur-lg opacity-75" />
                <div className="relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                  <img
                    src="/products/royal-elephant-green-tote.jpg"
                    alt="The Royal Haathi Linen Tote"
                    className="w-full aspect-[4/5] object-cover object-center"
                    onError={(e) => {
                      e.target.src = "/products/royal-elephant-embroidery-detail.jpg";
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-zinc-100">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                      Flagship Edition
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">
                      The Royal Haathi Linen Tote
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-white">₹1,499</span>
                        <span className="text-xs text-zinc-400 line-through">₹2,299</span>
                        <span className="text-[10px] bg-red-800 text-white font-bold px-1.5 py-0.5 rounded">
                          35% OFF
                        </span>
                      </div>
                      <Link
                        to="/product/royal-haathi-zinc-linen-tote"
                        className="text-xs text-zinc-300 font-semibold underline underline-offset-4 hover:text-white"
                      >
                        Shop Now →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CURATED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
            Curated For Every Occasion
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900">
            Handcrafted Linen Collections
          </h2>
          <p className="text-sm text-zinc-500">
            From regal Indian motifs for grand weddings to minimalist earth-toned everyday carry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Royal Heritage Haathi",
              desc: "Zari, sequin & velvet applique embroidery",
              price: "From ₹1,299",
              img: "/products/royal-elephant-green-tote.jpg",
              slug: "royal-heritage",
            },
            {
              title: "Everyday Minimal Linen",
              desc: "Eco-friendly structured flax linen shoppers",
              price: "From ₹649",
              img: "/products/minimalist-raw-linen.jpg",
              slug: "everyday-minimal",
            },
            {
              title: "Festive Evening Potlis",
              desc: "Mughal florals with handcrafted beaded latkans",
              price: "From ₹899",
              img: "/products/crimson-floral-potli.jpg",
              slug: "festive-gifting",
            },
            {
              title: "Antique Zari Clutches",
              desc: "Banarasi border detailing with brass link chains",
              price: "From ₹699",
              img: "/products/evening-gold-clutch.jpg",
              slug: "potlis-clutches",
            },
          ].map((cat, idx) => (
            <Link
              key={idx}
              to={`/shop?category=${cat.slug}`}
              className="group relative rounded-xl overflow-hidden bg-zinc-100 aspect-[3/4] border border-zinc-200 shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "/products/royal-elephant-green-tote.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">
                  {cat.price}
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-zinc-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-1">{cat.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-zinc-300 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
              Customer Favorites
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 mt-1">
              Best Selling Linen Bags
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-zinc-600 transition-colors"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-zinc-100 rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. WORKSHOP VIDEO & CRAFTSMANSHIP SPOTLIGHT */}
      <section id="workshop-video" className="bg-zinc-950 text-zinc-200 py-20 relative overflow-hidden border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Video Player Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
                <video
                  src="/workshop-process.mp4"
                  controls
                  playsInline
                  poster="/products/royal-elephant-embroidery-detail.jpg"
                  className="w-full aspect-[9/16] max-h-[580px] mx-auto object-contain bg-black"
                />
              </div>
              <div className="mt-3 text-center text-xs text-zinc-400 italic flex items-center justify-center gap-1.5">
                <Video size={13} className="text-zinc-400" />
                <span>Real footage from our computerized embroidery workshop in Surat</span>
              </div>
            </div>

            {/* Craftsmanship Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 text-xs font-semibold tracking-wider uppercase border border-zinc-800">
                <Award className="w-3.5 h-3.5" />
                <span>The Art of the Loom</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Where High Precision Meets Artisanal Soul
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
                At <strong>Mavtar Impex</strong>, each bag begins with pure, heavyweight Belgian flax linen. Using state-of-the-art multi-head computerized embroidery machines, thousands of fine zari, sequin, and resham stitches are woven into our signature royal elephant motifs.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: "High-Density Zari & Sequin Threadwork",
                    desc: "Intricate royal elephant caparisons featuring shimmering gold outlines and velvet patch applique.",
                  },
                  {
                    title: "Reinforced Heavy-GSM Linen Handles",
                    desc: "Double-stitched cross handles designed to effortlessly hold 8-10 kg of weight.",
                  },
                  {
                    title: "Eco-Conscious & Plastic-Free",
                    desc: "100% natural biodegradable linen with water-resistant organic cotton inner lining.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-zinc-300 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/craftsmanship"
                  className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  Read The Artisan Story
                </Link>
                <Link
                  to="/bulk-inquiry"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 px-6 py-3 rounded-full text-sm transition-colors"
                >
                  Custom Wedding & Bulk Orders
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WEDDING FAVORS & BULK INQUIRY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-zinc-100 rounded-2xl p-8 sm:p-12 border border-zinc-300 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
              Weddings • Corporate Hampers • Wholesale Export
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900">
              Planning a Grand Wedding or Corporate Event?
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              We specialize in custom embroidered linen bags with couple monograms, family crests, or corporate branding. Fast turnaround, tiered wholesale pricing, and export-grade worldwide packing.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/bulk-inquiry"
                className="bg-zinc-900 hover:bg-black text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors"
              >
                Request Custom Gifting Quote
              </Link>
              <a
                href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20am%20interested%20in%20custom%20bulk%20linen%20bags"
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 px-6 py-3 rounded-full text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <span>WhatsApp Us: +91 95127 53471</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
