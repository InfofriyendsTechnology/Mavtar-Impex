import app from "./app";
import { setupSuperAdmin } from "./utils/setupSuperAdmin";

const PORT = process.env.PORT || 1653;

const server = app.listen(PORT, async () => {
  console.log(`====================================================`);
  console.log(` Mavtar Impex TypeScript Backend Running Smoothly`);
  console.log(` Port: ${PORT}`);
  console.log(` Health: http://localhost:${PORT}/api/health`);
  console.log(` Cloud:  Cloudinary (${process.env.CLOUDINARY_CLOUD_NAME})`);
  console.log(` DB:     Neon PostgreSQL (Schema: mavtar)`);
  console.log(`====================================================`);

  try {
    await setupSuperAdmin();
  } catch (err) {
    console.warn("Super Admin auto-setup notice:", err);
  }
});

server.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.warn(`Port ${PORT} in use, retrying on alternative port...`);
  } else {
    console.error("Server start error:", err);
  }
});
