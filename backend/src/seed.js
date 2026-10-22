import { db, initDb } from "./data/db.js";

const initialProducts = [
  {
    id: "prod-royal-haathi",
    title: "The Royal Haathi Emerald Linen Tote",
    slug: "royal-haathi-emerald-linen-tote",
    shortDescription: "Our signature emerald green pure linen tote featuring opulent royal elephant zari & velvet applique embroidery.",
    description: "Inspired by royal Rajasthani heritage, The Royal Haathi Emerald Tote is handcrafted from high-density pure Belgian linen fabric in a regal emerald green tone. The centerpiece is a masterfully digitized, multi-head machine-embroidered royal ceremonial elephant (Airavata) embellished with gold zari threadwork, shimmering sequins, and rich magenta velvet saddle applique. Features reinforced double-stitched top handles, a roomy interior lined with water-resistant cotton, and inner zipper compartments for everyday opulence.",
    price: 1499,
    originalPrice: 2299,
    stock: 45,
    category: "Royal Heritage Embroidery",
    categorySlug: "royal-heritage",
    fabric: "100% Heavy-GSM Belgian Pure Linen",
    embroideryType: "Multi-head Computerized Zari, Sequin & Velvet Applique",
    dimensions: "15\"H x 16\"W x 5.5\"D (Handle Drop: 9.5\")",
    closure: "Concealed Magnetic Snap Button + Premium YKK Inner Zip Pocket",
    lining: "Water-Resistant Organic Khadi Cotton Lining",
    careInstructions: "Spot clean with damp muslin cloth or professional dry clean only.",
    images: [
      "/products/royal-elephant-green-tote.jpg",
      "/products/royal-elephant-embroidery-detail.jpg",
      "/products/embroidery-loom-process.jpg"
    ],
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 38,
    sku: "MVT-EMR-001"
  },
  {
    id: "prod-mayura-zardozi",
    title: "Mayura Zardozi Ivory Linen Bag",
    slug: "mayura-zardozi-ivory-linen-bag",
    shortDescription: "Regal peacock embroidery rendered in antique gold cord work on natural unbleached ivory linen.",
    description: "Graceful and majestic, the Mayura Zardozi tote highlights the sacred Indian peacock dancing amidst botanical vines. Embroidered with antique gold metallic threads and soft teal accents on raw unbleached natural linen, this bag seamlessly bridges traditional wedding elegance with contemporary chic.",
    price: 1299,
    originalPrice: 1899,
    stock: 30,
    category: "Royal Heritage Embroidery",
    categorySlug: "royal-heritage",
    fabric: "Unbleached Natural Ivory Linen",
    embroideryType: "Antique Gold Cord & Fine Resham Thread Embroidery",
    dimensions: "14\"H x 15\"W x 4.5\"D",
    closure: "Magnetic Snap with Zip Compartment",
    lining: "Soft Beige Cotton Lining",
    careInstructions: "Dry clean recommended.",
    images: [
      "/products/ivory-peacock-linen.jpg",
      "/products/natural-beige-tote.jpg"
    ],
    isFeatured: true,
    isBestSeller: false,
    rating: 4.8,
    reviewsCount: 22,
    sku: "MVT-IVR-002"
  },
  {
    id: "prod-gulbagh-potli",
    title: "Gulbagh Ruby Mughal Floral Potli",
    slug: "gulbagh-ruby-mughal-floral-potli",
    shortDescription: "Handcrafted festive evening potli in rich crimson linen with Mughal blossom embroidery and gold tassel drawstring.",
    description: "A show-stopping accessory for sangeets, weddings, and festive evenings. Handcrafted in crimson red cotton-linen blend with intricate Mughal floral motifs, golden piping, and handcrafted beaded tassels. Accommodates smartphones, cosmetics, and essentials comfortably.",
    price: 899,
    originalPrice: 1399,
    stock: 60,
    category: "Festive & Wedding Gifting",
    categorySlug: "festive-gifting",
    fabric: "Rich Ruby Red Cotton-Linen Blend",
    embroideryType: "Mughal Floral Resham & Zari Work",
    dimensions: "9.5\"H x 8.5\"W (Circular Base: 5\" Dia)",
    closure: "Braided Gold Drawstring with Handcrafted Latkan Tassels",
    lining: "Smooth Sateen Interior",
    careInstructions: "Spot clean only.",
    images: [
      "/products/crimson-floral-potli.jpg",
      "/products/evening-gold-clutch.jpg"
    ],
    isFeatured: true,
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 45,
    sku: "MVT-POT-003"
  },
  {
    id: "prod-kutch-shopper",
    title: "Kutch Paisley Ochre Linen Shopper",
    slug: "kutch-paisley-ochre-linen-shopper",
    shortDescription: "Vibrant mustard ochre linen tote featuring traditional Gujarati paisley embroidery and mirror accents.",
    description: "Paying homage to Gujarat’s illustrious textile heritage, this warm ochre linen tote features symmetrical paisley and geometric threadwork interspersed with reflective mirror accents. Roomy, ultra-durable, and perfect for weekend markets or resort getaways.",
    price: 999,
    originalPrice: 1499,
    stock: 40,
    category: "Everyday Minimal Linen",
    categorySlug: "everyday-minimal",
    fabric: "100% Textured Mustard Linen Canvas",
    embroideryType: "Gujarati Paisley & Mirror Accent Stitching",
    dimensions: "16\"H x 17\"W x 6\"D",
    closure: "Open Top with Magnetic Center Clasp",
    lining: "Heavy Cotton Canvas Interior",
    careInstructions: "Gentle cold hand wash.",
    images: [
      "/products/ochre-linen-shopper.jpg",
      "/products/natural-beige-tote.jpg"
    ],
    isFeatured: false,
    isBestSeller: true,
    rating: 4.7,
    reviewsCount: 19,
    sku: "MVT-OCH-004"
  },
  {
    id: "prod-nilgiri-raw",
    title: "Nilgiri Eco Raw Linen Everyday Tote",
    slug: "nilgiri-eco-raw-linen-everyday-tote",
    shortDescription: "Clean, minimalist pure unbleached linen shopper with reinforced handles for everyday conscious living.",
    description: "The quintessential sustainable bag for work, travel, and daily errands. Crafted from 100% natural flax linen with subtle tone-on-tone edge stitching. Lightweight yet built to carry laptops, books, groceries, and daily essentials effortlessly.",
    price: 649,
    originalPrice: 899,
    stock: 80,
    category: "Everyday Minimal Linen",
    categorySlug: "everyday-minimal",
    fabric: "Raw Unbleached Flax Linen",
    embroideryType: "Minimalist Tone-on-Tone Edge Embroidery",
    dimensions: "15\"H x 14\"W x 4\"D",
    closure: "Magnetic Brass Snap",
    lining: "Unlined Raw Natural Finish with Bound Seams",
    careInstructions: "Machine wash cold on gentle cycle. Line dry.",
    images: [
      "/products/minimalist-raw-linen.jpg",
      "/products/natural-beige-tote.jpg"
    ],
    isFeatured: false,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 52,
    sku: "MVT-NIL-005"
  },
  {
    id: "prod-varanasi-clutch",
    title: "Varanasi Antique Zari Linen Clutch",
    slug: "varanasi-antique-zari-linen-clutch",
    shortDescription: "Compact evening linen clutch with ornate floral border embroidery and detachable brass link chain.",
    description: "An understated luxury piece for formal dinners and evening celebrations. Fine Belgian linen framed with intricate antique gold zari borders inspired by Banarasi brocades. Includes an optional cross-body gold chain for hands-free elegance.",
    price: 699,
    originalPrice: 1099,
    stock: 35,
    category: "Artisanal Potlis & Clutches",
    categorySlug: "potlis-clutches",
    fabric: "Fine Woven Natural Linen",
    embroideryType: "Banarasi Border Zari Work",
    dimensions: "6.5\"H x 10\"W x 2\"D",
    closure: "Hidden Magnetic Flap Closure",
    lining: "Satin Interior with 3 Card Slots",
    careInstructions: "Spot clean only.",
    images: [
      "/products/evening-gold-clutch.jpg",
      "/products/ivory-peacock-linen.jpg"
    ],
    isFeatured: true,
    isBestSeller: false,
    rating: 4.6,
    reviewsCount: 14,
    sku: "MVT-VAR-006"
  },
  {
    id: "prod-forest-sling",
    title: "Heritage Banyan Forest Linen Sling",
    slug: "heritage-banyan-forest-linen-sling",
    shortDescription: "Olive green linen cross-body sling with embroidered sacred banyan foliage and adjustable leather strap.",
    description: "A practical hands-free everyday bag in deep moss olive linen. Features intricate leaf silhouette embroidery, front quick-access pocket, and a durable brass zipper. Perfect companion for travels, city walks, and casual outings.",
    price: 1199,
    originalPrice: 1699,
    stock: 28,
    category: "Everyday Minimal Linen",
    categorySlug: "everyday-minimal",
    fabric: "Heavy Olive Moss Linen",
    embroideryType: "Botanical Silhouette Machine Embroidery",
    dimensions: "10.5\"H x 9\"W x 3\"D",
    closure: "Brass Metal Zipper",
    lining: "Checked Cotton Lining with Key Leash",
    careInstructions: "Wipe with damp cloth.",
    images: [
      "/products/olive-forest-sling.jpg",
      "/products/minimalist-raw-linen.jpg"
    ],
    isFeatured: false,
    isBestSeller: false,
    rating: 4.7,
    reviewsCount: 17,
    sku: "MVT-FOR-007"
  },
  {
    id: "prod-jaipur-duffle",
    title: "Jaipur Sanctuary Heavy Linen Duffle",
    slug: "jaipur-sanctuary-heavy-linen-duffle",
    shortDescription: "Spacious weekend travel bag in heavy 18oz linen canvas with lotus pond embroidery and vegan leather trims.",
    description: "Engineered for weekend escapes and heritage travels. Made of rugged 18oz natural linen canvas with serene lotus embroidery along the side panels. Reinforced bottom with metal protective feet, dual grab handles, and a detachable padded shoulder strap.",
    price: 1899,
    originalPrice: 2699,
    stock: 20,
    category: "Royal Heritage Embroidery",
    categorySlug: "royal-heritage",
    fabric: "18oz Heavy Linen-Cotton Canvas",
    embroideryType: "Multi-colored Lotus Pond Resham Threadwork",
    dimensions: "11\"H x 19\"W x 10\"D",
    closure: "Two-way Heavy Duty Brass Zipper",
    lining: "Waterproof Polyester Lining with Shoe Compartment",
    careInstructions: "Professional dry clean only.",
    images: [
      "/products/lotus-linen-duffle.jpg",
      "/products/natural-beige-tote.jpg"
    ],
    isFeatured: true,
    isBestSeller: false,
    rating: 4.9,
    reviewsCount: 26,
    sku: "MVT-JAI-008"
  }
];

const seed = async () => {
  try {
    console.log("Seeding Mavtar Impex database...");
    await initDb();

    for (const prod of initialProducts) {
      await db.saveProduct(prod);
      console.log(`Saved product: ${prod.title} (₹${prod.price})`);
    }

    console.log("Database seeded successfully with luxury linen bags!");
  } catch (err) {
    console.error("Seeding failed:", err);
  }
};

seed();
