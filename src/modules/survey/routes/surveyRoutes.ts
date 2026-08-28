import { Router } from "express";
import surveyController from "../controllers/surveyController";

const router = Router();

router.get(
  "/",
  surveyController.getAll
);

router.get(
  "/:id",
  surveyController.getById
);

router.post(
  "/",
  surveyController.create
);

router.patch(
  "/:id",
  surveyController.update
);

router.delete(
  "/:id",
  surveyController.remove
);

export default router;
