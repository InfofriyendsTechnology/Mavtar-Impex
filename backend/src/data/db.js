import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "../../data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default initial state
const defaultState = {
  products: [],
  categories: [
    { id: "cat-1", name: "Royal Heritage Embroidery", slug: "royal-heritage", description: "Opulent zari and velvet embroidery on premium linen" },
    { id: "cat-2", name: "Everyday Minimal Linen", slug: "everyday-minimal", description: "Structured pure linen totes for sustainable daily chic" },
    { id: "cat-3", name: "Festive & Wedding Gifting", slug: "festive-gifting", description: "Exquisite embroidered bags perfect for wedding favors and festivities" },
    { id: "cat-4", name: "Artisanal Potlis & Clutches", slug: "potlis-clutches", description: "Handcrafted evening wear bags with intricate motif work" }
  ],
  orders: [],
  inquiries: [],
  settings: {
    storeName: "Mavtar Impex",
    ownerName: "Krish Vaghani",
    tagline: "Handcrafted Luxury Linen Bags & Royal Indian Embroidery",
    supportEmail: "contact@mavtarimpex.com",
    supportPhone: "+91 95127 53471",
    whatsappNumber: "919512753471",
    freeShippingThreshold: 999,
    standardShippingFee: 99,
    bannerText: "Handcrafted Luxury Linen Bags | Free Pan-India Delivery on Orders Above ₹999 | Use Code: MAVTAR10 for 10% OFF",
    address: "Surat, Gujarat, India - 395006",
  }
};

const getLocalData = () => {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading store.json:", err.message);
  }
  return defaultState;
};

const saveLocalData = (data) => {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing store.json:", err.message);
  }
};

let pool = null;
let usePostgres = false;

if (process.env.DATABASE_URL) {
  try {
    pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    });
  } catch (e) {
    console.warn("Could not create Postgres pool:", e.message);
  }
}

export const initDb = async () => {
  if (!fs.existsSync(STORE_FILE)) {
    saveLocalData(defaultState);
  }

  if (pool) {
    try {
      const client = await pool.connect();
      console.log("Connected successfully to Neon PostgreSQL database!");
      usePostgres = true;

      // Create tables for Mavtar Impex
      await client.query(`
        CREATE TABLE IF NOT EXISTS mavtar_products (
          id VARCHAR(64) PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS mavtar_orders (
          id VARCHAR(64) PRIMARY KEY,
          order_number VARCHAR(64) UNIQUE,
          data JSONB NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS mavtar_inquiries (
          id VARCHAR(64) PRIMARY KEY,
          data JSONB NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS mavtar_settings (
          key VARCHAR(64) PRIMARY KEY,
          value JSONB NOT NULL
        );
      `);
      client.release();
      console.log("Neon Postgres tables verified.");
    } catch (err) {
      console.warn("Postgres connection warning (will use resilient local storage):", err.message);
      usePostgres = false;
    }
  }
};

export const db = {
  // PRODUCTS
  getProducts: async () => {
    if (usePostgres && pool) {
      try {
        const res = await pool.query("SELECT data FROM mavtar_products ORDER BY created_at DESC");
        if (res.rows.length > 0) {
          return res.rows.map(r => r.data);
        }
      } catch (err) {
        console.warn("Postgres read failed, falling back to local:", err.message);
      }
    }
    const local = getLocalData();
    return local.products || [];
  },

  getProductById: async (id) => {
    const products = await db.getProducts();
    return products.find(p => p.id === id || p.slug === id) || null;
  },

  saveProduct: async (product) => {
    // Save to local first
    const local = getLocalData();
    const existingIdx = local.products.findIndex(p => p.id === product.id);
    if (existingIdx >= 0) {
      local.products[existingIdx] = { ...local.products[existingIdx], ...product, updatedAt: new Date().toISOString() };
    } else {
      local.products.unshift({ ...product, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    saveLocalData(local);

    // Save to Postgres
    if (usePostgres && pool) {
      try {
        await pool.query(
          `INSERT INTO mavtar_products (id, data) VALUES ($1, $2)
           ON CONFLICT (id) DO UPDATE SET data = $2`,
          [product.id, JSON.stringify(product)]
        );
      } catch (err) {
        console.warn("Postgres save failed:", err.message);
      }
    }
    return product;
  },

  deleteProduct: async (id) => {
    const local = getLocalData();
    local.products = local.products.filter(p => p.id !== id);
    saveLocalData(local);

    if (usePostgres && pool) {
      try {
        await pool.query("DELETE FROM mavtar_products WHERE id = $1", [id]);
      } catch (err) {
        console.warn("Postgres delete failed:", err.message);
      }
    }
    return true;
  },

  // ORDERS
  getOrders: async () => {
    if (usePostgres && pool) {
      try {
        const res = await pool.query("SELECT data FROM mavtar_orders ORDER BY created_at DESC");
        if (res.rows.length > 0) {
          return res.rows.map(r => r.data);
        }
      } catch (err) {
        console.warn("Postgres orders read error:", err.message);
      }
    }
    const local = getLocalData();
    return local.orders || [];
  },

  getOrderById: async (identifier) => {
    const orders = await db.getOrders();
    const cleanId = String(identifier).trim().toLowerCase();
    return orders.find(o => 
      String(o.id).toLowerCase() === cleanId || 
      String(o.orderNumber).toLowerCase() === cleanId || 
      String(o.customerPhone).replace(/\D/g, '') === cleanId.replace(/\D/g, '')
    ) || null;
  },

  saveOrder: async (order) => {
    const local = getLocalData();
    const existingIdx = local.orders.findIndex(o => o.id === order.id);
    if (existingIdx >= 0) {
      local.orders[existingIdx] = { ...local.orders[existingIdx], ...order, updatedAt: new Date().toISOString() };
    } else {
      local.orders.unshift({ ...order, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    saveLocalData(local);

    if (usePostgres && pool) {
      try {
        await pool.query(
          `INSERT INTO mavtar_orders (id, order_number, data) VALUES ($1, $2, $3)
           ON CONFLICT (id) DO UPDATE SET data = $3`,
          [order.id, order.orderNumber, JSON.stringify(order)]
        );
      } catch (err) {
        console.warn("Postgres order save error:", err.message);
      }
    }
    return order;
  },

  // INQUIRIES
  getInquiries: async () => {
    if (usePostgres && pool) {
      try {
        const res = await pool.query("SELECT data FROM mavtar_inquiries ORDER BY created_at DESC");
        if (res.rows.length > 0) {
          return res.rows.map(r => r.data);
        }
      } catch (err) {
        console.warn("Postgres inquiries read error:", err.message);
      }
    }
    const local = getLocalData();
    return local.inquiries || [];
  },

  saveInquiry: async (inquiry) => {
    const local = getLocalData();
    const existingIdx = local.inquiries.findIndex(i => i.id === inquiry.id);
    if (existingIdx >= 0) {
      local.inquiries[existingIdx] = { ...local.inquiries[existingIdx], ...inquiry, updatedAt: new Date().toISOString() };
    } else {
      local.inquiries.unshift({ ...inquiry, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    saveLocalData(local);

    if (usePostgres && pool) {
      try {
        await pool.query(
          `INSERT INTO mavtar_inquiries (id, data) VALUES ($1, $2)
           ON CONFLICT (id) DO UPDATE SET data = $2`,
          [inquiry.id, JSON.stringify(inquiry)]
        );
      } catch (err) {
        console.warn("Postgres inquiry save error:", err.message);
      }
    }
    return inquiry;
  },

  // CATEGORIES & SETTINGS
  getCategories: async () => {
    const local = getLocalData();
    return local.categories || [];
  },

  getSettings: async () => {
    const local = getLocalData();
    return local.settings || defaultState.settings;
  },

  updateSettings: async (newSettings) => {
    const local = getLocalData();
    local.settings = { ...local.settings, ...newSettings };
    saveLocalData(local);
    return local.settings;
  }
};
