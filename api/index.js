import app from "../backend/src/app.js";
import { initDb } from "../backend/src/data/db.js";

let dbInitialized = false;

export default async function handler(req, res) {
  if (!dbInitialized) {
    try {
      await initDb();
      dbInitialized = true;
    } catch (err) {
      console.error("Vercel DB Init Warning:", err.message);
    }
  }
  return app(req, res);
}
