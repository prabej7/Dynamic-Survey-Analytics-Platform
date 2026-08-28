import { Router } from "express";

import authMiddleware from "../../../middlewares/authMiddleware";
import { sanitize } from "../../../middlewares/sanitize";
import authController from "../controllers/authController";
import { loginSchema, registerSchema } from "../validation/authValidation";

const router = Router();

router.post("/register", sanitize(registerSchema), authController.register);

router.post("/login", sanitize(loginSchema), authController.login);

router.post("/logout", authMiddleware, authController.logout);

router.get("/me", authMiddleware, authController.getProfile);

export default router;
