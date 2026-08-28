import { Router } from "express";
import authMiddleware from "../../../middlewares/authMiddleware";
import roleMiddleware from "../../../middlewares/roleMiddleware";
import { sanitize } from "../../../middlewares/sanitize";
import surveyController from "../controllers/surveyController";
import {
  createSurveySchema,
  updateSurveySchema,
} from "../validation/surveyValidation";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  surveyController.getAll,
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("USER", "ADMIN"),
  surveyController.getById,
);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  sanitize(createSurveySchema),
  surveyController.create,
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  sanitize(updateSurveySchema),
  surveyController.update,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  surveyController.remove,
);

router.patch(
  "/:id/publish",
  authMiddleware,
  roleMiddleware("ADMIN"),
  surveyController.publish,
);

router.get("/slug/:slug", surveyController.findBySlug);

router.get(
  "/:id/analytics",
  authMiddleware,
  roleMiddleware("ADMIN"),
  surveyController.analytics,
);

export default router;
