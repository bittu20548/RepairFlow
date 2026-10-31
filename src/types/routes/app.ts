import express from "express";
import cors from "cors";

import customerRoutes from "./routes/customer.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "RepairFlow API is running",
  });
});

app.use("/api/customers", customerRoutes);

export default app;