// src/modules/dashboard/routes/dashboardRoutes.ts

import { Router } from "express";

import authMiddleware from "../../../middlewares/authMiddleware";
import roleMiddleware from "../../../middlewares/roleMiddleware";

import dashboardController from "../controllers/dashboardController";

const router = Router();

router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware("ADMIN"),
  dashboardController.getAnalytics,
);

export default router;
