# Mavtar Impex — Handcrafted Luxury Linen Bags & Royal Indian Embroidery

**Mavtar Impex** is a production-ready Fullstack E-Commerce & Administrative Backoffice Monorepo specialized in handcrafted heavy-GSM linen bags embellished with computerized royal Indian embroidery (Zari, resham, sequin, and velvet applique).

---

## 🏗️ Monorepo Architecture

```text
Mavtar Impex/
├── api/                    # Vercel Serverless Function entry point (/api/*)
│   └── index.js
├── backend/                # Node.js + Express REST API
│   ├── src/
│   │   ├── controllers/    # Products, Orders, Inquiries, Analytics, Auth, Settings
│   │   ├── data/           # Neon PostgreSQL connection & schema
│   │   ├── routes/         # REST API routes
│   │   ├── app.js          # Express application config
│   │   └── server.js       # Standalone HTTP server
│   └── package.json
├── frontend/               # React 18 + Vite + SCSS Luxury UI
│   ├── public/             # Optimized product photos & craftsmanship video
│   ├── src/
│   │   ├── components/     # Navbar, Footer, CartDrawer, ProductCard, AnnouncementBar
│   │   ├── context/        # CartContext, AuthContext
│   │   ├── pages/
│   │   │   ├── public/     # Home, Shop, ProductDetail, Checkout, TrackOrder, Craftsmanship, BulkInquiry
│   │   │   └── admin/      # Bond CRM SCSS Admin: Dashboard, Products, Orders, Inquiries, Settings
│   │   └── styles/         # SCSS theme variables, mixins, global resets & autofill fixes
│   └── package.json
├── vercel.json             # Vercel deployment configuration
├── package.json            # Monorepo workspaces & scripts
└── start-dev.bat           # 1-Click local development launcher
```

---

## 🌐 Localhost Port Mapping

| Service | Localhost URL | Port Number | Description |
| :--- | :--- | :--- | :--- |
| **Backend API** | [http://localhost:1653/api/health](http://localhost:1653/api/health) | `1653` | Express REST API + Neon PostgreSQL DB |
| **Admin Backoffice Panel** | [http://localhost:2253](http://localhost:2253) | `2253` | Dedicated admin backoffice dashboard & catalog manager |
| **Public Storefront** | [http://localhost:1053](http://localhost:1053) | `1053` | Customer luxury linen e-commerce store |

---

## 🔑 Admin Credentials
- **Localhost URL:** [http://localhost:2253/admin/login](http://localhost:2253/admin/login)
- **Production URL:** `https://your-domain.vercel.app/admin/login`
- **Mobile Number / Username:** `9512753471`
- **Password:** `Mavtar#161026`

---

## 🚀 Pushing to GitHub

Run the following commands in the project root:

```bash
# 1. Add your GitHub repository remote
git remote add origin https://github.com/YOUR_USERNAME/mavtar-impex.git

# 2. Rename branch to main
git branch -M main

# 3. Push all commits to GitHub
git push -u origin main
```

---

## ☁️ Deploying to Vercel

1. Log in to [Vercel](https://vercel.com) and click **"Add New..."** -> **"Project"**.
2. Select your imported GitHub repository **`mavtar-impex`**.
3. Under **Framework Preset**, keep it as **Other** (Vercel automatically detects `vercel.json`).
4. In the **Environment Variables** section, add the following keys from your `.env`:

| Key | Example Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://...neon.tech/neondb?sslmode=require` | Neon PostgreSQL connection string |
| `SUPER_ADMIN_MOBILE` | `9512753471` | Admin login mobile number |
| `SUPER_ADMIN_PASSWORD` | `Mavtar#161026` | Admin login password |
| `JWT_SECRET` | `MavtarImpexSecretKey2026` | JWT signing secret |
| `CLOUDINARY_CLOUD_NAME` | `pbnqazpy` | Cloudinary Cloud Name |
| `CLOUDINARY_API_KEY` | `636433964381783` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | `zgkcxd4_xqwEiH6c4Oq1HwSZJqo` | Cloudinary API Secret |

5. Click **Deploy**. Vercel will build the frontend and deploy the serverless API automatically.
