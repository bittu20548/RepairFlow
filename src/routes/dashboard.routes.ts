
import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller";

const router = Router();

// Get shop dashboard
router.get("/", getDashboard);

export default router;
