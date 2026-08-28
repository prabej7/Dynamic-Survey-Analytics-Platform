import { Router } from "express";
import authRoutes from "./auth/routes/authRoutes";
import surveyRoutes from "./survey/routes/surveyRoutes";
import responseRoutes from "./response/routes/responseRoutes";

const router = Router();
router.use("/v1/auth", authRoutes);
router.use("/v1/surveys", surveyRoutes);
router.use("/v1/responses", responseRoutes);

export default router;
