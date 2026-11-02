import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes";
import customerRoutes from "./routes/customer.routes";
import shopRoutes from "./routes/shop.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  return res.json({
    success: true,
    message: "RepairFlow API is running",
  });
});

app.use("/api/health", healthRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/customers", customerRoutes);

app.use((_req, res) => {
  return res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

export default app;