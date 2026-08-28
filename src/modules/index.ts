import { Router } from "express";
import authRoutes from "./auth/routes/authRoutes";

const router = Router();
router.use("/v1/auth", authRoutes);

export default router;
