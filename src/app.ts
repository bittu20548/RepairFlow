import express from "express";
import cors from "cors";

// Routes
import healthRoutes from "./routes/health.routes";
import customerRoutes from "./routes/customer.routes";
import shopRoutes from "./routes/shop.routes";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "RepairFlow API is running",
  });
});

// API routes
app.use("/api/health", healthRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/customers", customerRoutes);

// 404 handler
app.use((_req, res) => {
  return res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

export default app;