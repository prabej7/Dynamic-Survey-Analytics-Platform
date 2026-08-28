import { Router } from "express";

import authMiddleware from "../../../middlewares/authMiddleware";
import roleMiddleware from "../../../middlewares/roleMiddleware";
import { sanitize } from "../../../middlewares/sanitize";

import responseController from "../controllers/responseController";

import {
  createResponseSchema,
  updateResponseSchema,
} from "../validation/responseValidation";

const router = Router();

router.post(
  "/:surveyId",
  sanitize(createResponseSchema),
  responseController.create
);


router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  responseController.getAll
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  responseController.getById
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  sanitize(updateResponseSchema),
  responseController.update
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  responseController.remove
);

export default router;