import { Router } from "express";
import responseController from "../controllers/responseController";

const router = Router();

router.get(
  "/",
  responseController.getAll
);

router.get(
  "/:id",
  responseController.getById
);

router.post(
  "/",
  responseController.create
);

router.patch(
  "/:id",
  responseController.update
);

router.delete(
  "/:id",
  responseController.remove
);

export default router;
