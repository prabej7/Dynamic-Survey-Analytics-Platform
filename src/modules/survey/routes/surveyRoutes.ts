import { Router } from "express";
import authMiddleware from "../../../middlewares/authMiddleware";
import roleMiddleware from "../../../middlewares/roleMiddleware";
import surveyController from "../controllers/surveyController";

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
  surveyController.create,
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  surveyController.update,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  surveyController.remove,
);

export default router;
