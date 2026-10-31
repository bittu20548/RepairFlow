import { Router } from "express";
import { create } from "../controllers/shop.controller";

const router = Router();

router.post("/", create);

export default router;
