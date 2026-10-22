import app from "./app.js";
import { initDb } from "./data/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 1653;

const startServer = async () => {
  try {
    await initDb();
    const server = app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(` Mavtar Impex E-Commerce Backend Server Running`);
      console.log(` Port: ${PORT}`);
      console.log(` Health: http://localhost:${PORT}/api/health`);
      console.log(`===============================================`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.warn(`Port ${PORT} in use, retrying on ${Number(PORT) + 1}...`);
        app.listen(Number(PORT) + 1, () => {
          console.log(`Server started on alternative port ${Number(PORT) + 1}`);
        });
      } else {
        console.error("Server start error:", err);
      }
    });
  } catch (err) {
    console.error("Failed to initialize server:", err);
    process.exit(1);
  }
};

startServer();
