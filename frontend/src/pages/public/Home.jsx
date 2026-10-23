import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Star, 
  Video, 
  PhoneCall, 
  Package, 
  Layers, 
  Zap,
  ShoppingBag
} from "lucide-react";
import { motion } from "framer-motion";
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
    <div className="overflow-x-hidden space-y-16 sm:space-y-24 lg:space-y-32 pb-24">
      
      {/* =========================================================================
          1. MASSIVE HAUTE-COUTURE LUXURY HERO SECTION
         ========================================================================= */}
      <section className="relative overflow-hidden bg-[#09090B] text-zinc-100 min-h-[90vh] lg:min-h-[94vh] flex items-center border-b border-zinc-800">
        
        {/* Ambient Luxury Lighting & Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-zinc-800/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-zinc-700/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left"
            >
              
              {/* Luxury Capsule Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-zinc-300 text-xs font-bold tracking-widest uppercase shadow-sm mx-auto lg:mx-0 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-zinc-300 animate-pulse" />
                <span>Haute Couture Linen • Surat Atelier</span>
              </div>

              {/* Massive Editorial Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] font-bold text-white tracking-tight leading-[1.04]">
                Pure Belgian Linen. <br />
                <span className="italic font-serif text-zinc-300 underline decoration-zinc-700/50 decoration-2 underline-offset-8">
                  Royal Zari
                </span> Embroidery.
              </h1>

              {/* Authoritative Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Handcrafted heavy 450+ GSM natural flax linen carryalls, embellished with computerized 28,000-stitch royal elephant motifs, metallic zari, and velvet applique. Zero plastic. 100% sustainable heirloom luxury.
              </p>

              {/* Atelier Metric Chips */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
                {[
                  "450+ GSM Heavy Flax",
                  "28,000+ Zari Stitches",
                  "10kg Reinforced Handles",
                  "Free Pan-India Shipping > ₹999"
                ].map((tag, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-300 text-xs font-semibold tracking-wide"
                  >
                    <CheckCircle2 size={13} className="text-zinc-400" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* High-Impact CTA Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 sm:gap-4">
                <Link
                  to="/shop"
                  className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-8 py-4 rounded-full tracking-wide text-sm transition-all shadow-lg hover:shadow-white/10 flex items-center justify-center gap-2.5 group active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4 text-zinc-900" />
                  <span>Shop Royal Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#workshop-video"
                  className="bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700 font-semibold px-6 py-4 rounded-full text-sm transition-all flex items-center justify-center gap-2.5 backdrop-blur-md active:scale-[0.98]"
                >
                  <Play className="w-4 h-4 text-zinc-300 fill-zinc-300" />
                  <span>Watch Surat Loom Video</span>
                </a>
              </div>

            </motion.div>

            {/* Right Hero Product Feature Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative w-full"
            >
              <div className="relative mx-auto max-w-sm sm:max-w-md w-full">
                
                {/* Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-r from-zinc-700/20 via-zinc-800/40 to-zinc-900/20 rounded-3xl blur-xl opacity-80" />
                
                {/* Product Frame */}
                <div className="relative bg-zinc-900/90 rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl">
                  
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <span className="bg-zinc-950/85 backdrop-blur-md border border-zinc-700 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Flagship Edition
                    </span>
                    <span className="bg-red-700/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      35% OFF
                    </span>
                  </div>

                  <img
                    src="/products/royal-elephant-green-tote.jpg"
                    alt="The Royal Haathi Linen Tote"
                    className="w-full aspect-[4/5] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = "/products/royal-elephant-embroidery-detail.jpg";
                    }}
                  />

                  {/* Glassmorphism Bottom Information Pill */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-5 sm:p-6 text-zinc-100">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-semibold mb-1">
                      <Star size={13} className="text-zinc-300 fill-zinc-300" />
                      <span>4.9 / 5 • 420+ Verified Clients</span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                      The Royal Haathi Linen Tote
                    </h3>

                    <p className="text-xs text-zinc-300 mt-1 line-clamp-1">
                      Zari & velvet elephant applique on heavy structured flax linen.
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/80">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-bold text-white">₹1,499</span>
                        <span className="text-xs text-zinc-400 line-through">₹2,299</span>
                      </div>
                      <Link
                        to="/product/royal-haathi-zinc-linen-tote"
                        className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-4 py-2 rounded-full text-xs transition-colors flex items-center gap-1.5 shadow"
                      >
                        <span>View Piece</span>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* =========================================================================
          2. CONTINUOUS LUXURY MARQUEE TICKER (High-Impact Ribbon)
         ========================================================================= */}
      <div className="bg-[#121316] py-3.5 border-y border-zinc-800 overflow-hidden select-none -mt-4">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-8 shrink-0 tracking-widest text-xs uppercase font-bold text-zinc-400">
              <span className="flex items-center gap-2 text-zinc-200">
                <Sparkles size={13} className="text-zinc-400" />
                BELGIAN HEAVYWEIGHT FLAX LINEN
              </span>
              <span>•</span>
              <span>28,000+ COMPUTERIZED ZARI STITCHES</span>
              <span>•</span>
              <span className="text-zinc-200">HANDCRAFTED IN SURAT, GUJARAT</span>
              <span>•</span>
              <span>100% BIODEGRADABLE & PLASTIC-FREE</span>
              <span>•</span>
              <span className="text-zinc-200">REINFORCED 10KG CAPACITY HANDLES</span>
              <span>•</span>
              <span>BESPOKE WEDDING & CORPORATE HAMPERS</span>
              <span>•</span>
              <span className="text-zinc-200">EXPORT-GRADE WORLDWIDE PACKAGING</span>
              <span className="mr-8">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          3. CURATED COLLECTIONS (Massive Editorial Grid)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 border border-zinc-300 text-zinc-800 text-[11px] font-bold tracking-widest uppercase">
            <span>[ 01 / EDITIONS ]</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight leading-tight">
            Curated Collections for the Connoisseur
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed">
            From regal Indian wedding souvenirs adorned with resham elephant motifs to minimal earth-toned daily carryalls.
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {[
            {
              index: "01",
              title: "Royal Heritage Haathi",
              desc: "Zari, sequin & velvet applique embroidery",
              price: "From ₹1,299",
              img: "/products/royal-elephant-green-tote.jpg",
              slug: "royal-heritage",
            },
            {
              index: "02",
              title: "Everyday Minimal Linen",
              desc: "Eco-friendly structured flax linen shoppers",
              price: "From ₹649",
              img: "/products/minimalist-raw-linen.jpg",
              slug: "everyday-minimal",
            },
            {
              index: "03",
              title: "Festive Evening Potlis",
              desc: "Mughal florals with handcrafted beaded latkans",
              price: "From ₹899",
              img: "/products/crimson-floral-potli.jpg",
              slug: "festive-gifting",
            },
            {
              index: "04",
              title: "Antique Zari Clutches",
              desc: "Banarasi border detailing with brass link chains",
              price: "From ₹699",
              img: "/products/evening-gold-clutch.jpg",
              slug: "potlis-clutches",
            },
          ].map((cat) => (
            <Link
              key={cat.index}
              to={`/shop?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-zinc-900 aspect-[3/4] border border-zinc-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-end"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = "/products/royal-elephant-green-tote.jpg";
                }}
              />

              {/* Top Index Marker */}
              <div className="absolute top-4 left-4 z-10">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {cat.index}
                </span>
              </div>

              {/* Gradient Bottom Drawer */}
              <div className="relative z-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-5 sm:p-6 text-white space-y-1.5">
                <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-300">
                  {cat.price}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-1 font-light">
                  {cat.desc}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-1.5 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. BEST SELLERS SECTION (Live Dynamic Catalog)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 pb-4 border-b border-zinc-200">
          <div>
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
              Handcrafted in Surat
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-900 mt-1">
              Best Selling Masterpieces
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-zinc-600 transition-colors group"
          >
            <span>View All Masterpieces</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-zinc-200 rounded-xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          5. SURAT WORKSHOP & COMPUTERIZED EMBROIDERY SPOTLIGHT
         ========================================================================= */}
      <section id="workshop-video" className="bg-[#09090B] text-zinc-200 py-16 sm:py-24 relative overflow-hidden border-y border-zinc-800">
        
        {/* Subtle Decorative Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-zinc-800/20 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Video Player Card with Live Pulse */}
            <div className="lg:col-span-6 relative w-full">
              <div className="relative rounded-3xl overflow-hidden border border-zinc-700 shadow-2xl bg-black">
                
                {/* Live Indicator Pill */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-700 text-[11px] font-semibold text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Surat Computerized Loom Line 01</span>
                </div>

                <video
                  src="/workshop-process.mp4"
                  controls
                  playsInline
                  poster="/products/royal-elephant-embroidery-detail.jpg"
                  className="w-full aspect-[9/16] max-h-[560px] mx-auto object-contain bg-black"
                />
              </div>

              <div className="mt-3.5 text-center text-xs text-zinc-400 italic flex items-center justify-center gap-1.5">
                <Video size={14} className="text-zinc-400" />
                <span>Original footage recorded inside our high-precision multi-head embroidery facility</span>
              </div>
            </div>

            {/* Right: Craftsmanship Narrative */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 text-zinc-300 text-xs font-bold tracking-wider uppercase border border-zinc-700">
                <Award className="w-3.5 h-3.5 text-zinc-300" />
                <span>Precision Engineering & Craft</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-[1.08]">
                Where Multi-Head Precision Meets Gujarati Artisanship
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
                At <strong>Mavtar Impex</strong>, we refuse to work with cheap cotton duck or synthetic plastic blends. Each bag begins with pure, unadulterated Belgian flax linen, custom-stitched on state-of-the-art Japanese multi-head computerized embroidery machines.
              </p>

              {/* Detailed Feature Cards */}
              <div className="space-y-4 pt-1">
                {[
                  {
                    title: "28,000 High-Density Zari & Sequin Stitches",
                    desc: "Intricate royal elephant caparisons featuring shimmering gold outlines and velvet patch applique.",
                  },
                  {
                    title: "Heavyweight 450+ GSM Belgian Flax Linen",
                    desc: "Durable, organic texture with water-repellent cotton lining designed to hold up to 10 kg.",
                  },
                  {
                    title: "Ergonomic Reinforced Double-Stitched Handles",
                    desc: "Engineered 28cm drop handles for comfortable all-day shoulder or hand carry.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <CheckCircle2 className="w-5 h-5 text-zinc-300 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
                <Link
                  to="/craftsmanship"
                  className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-7 py-3.5 rounded-full text-sm transition-all text-center"
                >
                  Read The Artisan Story
                </Link>
                <Link
                  to="/bulk-inquiry"
                  className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-semibold px-7 py-3.5 rounded-full text-sm transition-all text-center"
                >
                  Custom Wedding & Bulk Orders
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. MASSIVE BESPOKE WEDDING & CORPORATE HAMPERS VIP BANNER
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#121316] via-[#18181B] to-[#0E0F12] rounded-3xl p-8 sm:p-14 border border-zinc-700 shadow-2xl relative overflow-hidden text-white">
          
          {/* Subtle Ambient Backing */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-zinc-800/25 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-5 relative z-10">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold tracking-widest uppercase">
              <Sparkles size={13} className="text-zinc-300" />
              <span>Weddings • Corporate Hampers • Wholesale Export</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Planning a Grand Indian Wedding or Luxury Corporate Gifting?
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
              We manufacture customized luxury linen tote bags with bride & groom monograms, family crests, or corporate emblems. Enjoy fast turnaround times, direct atelier wholesale pricing, and export-grade worldwide packing.
            </p>

            {/* 4-Item Gifting Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                "Custom Couple Monogram & Date Digitization",
                "Tiered Volume Pricing for 50 to 5,000+ Units",
                "12+ Linen Colorways & Matching Latkans",
                "Worldwide Air Cargo & Express Pan-India Delivery"
              ].map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200 font-semibold">
                  <CheckCircle2 size={15} className="text-zinc-400 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                to="/bulk-inquiry"
                className="bg-white hover:bg-zinc-200 text-zinc-950 font-bold px-8 py-4 rounded-full text-sm tracking-wide transition-all text-center shadow-lg active:scale-[0.98]"
              >
                Request Custom Gifting Quote
              </Link>
              
              <a
                href="https://wa.me/919512753471?text=Hello%20Mavtar%20Impex,%20I%20am%20interested%20in%20custom%20bulk%20linen%20bags"
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-900/90 hover:bg-zinc-800 text-white border border-zinc-700 px-8 py-4 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2.5 backdrop-blur-md active:scale-[0.98]"
              >
                <PhoneCall size={15} className="text-zinc-300" />
                <span>WhatsApp Concierge (+91 95127 53471)</span>
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          7. CLIENT TESTIMONIALS (Proof of Luxury)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
            Patron Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900">
            Trusted by Connoisseurs Across India & Abroad
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The Royal Haathi totes were the absolute highlight of our Udaipur wedding favors. Every single guest was stunned by the heavy linen and shimmering zari.",
              client: "Priyanshi Shah",
              location: "Mumbai",
              role: "Destination Wedding Bride"
            },
            {
              quote: "We ordered 250 bags for our corporate Diwali hampers with custom logo embroidery. Outstanding fabric weight and delivered 3 days before schedule.",
              client: "Ankit Mehta",
              location: "Ahmedabad",
              role: "Managing Director, FinTech"
            },
            {
              quote: "You simply cannot find this GSM of natural flax linen in typical retail stores. The craftsmanship in the elephant motif is couture level.",
              client: "Neha Singhania",
              location: "New Delhi",
              role: "Luxury Lifestyle Blogger"
            }
          ].map((t, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 sm:p-7 border border-zinc-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex gap-1 text-zinc-800">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-current text-zinc-900" />
                  ))}
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed font-light italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100">
                <div className="text-sm font-bold text-zinc-900">{t.client}</div>
                <div className="text-xs text-zinc-500">{t.role} • {t.location}</div>
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};

export default Home;
