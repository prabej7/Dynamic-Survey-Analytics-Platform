import { Request, Response } from "express";

import asyncHandler from "../../../middlewares/asyncHandler";
import surveyService from "../services/surveyService";

const surveyController = {
  getAll: asyncHandler(async (req: Request, res: Response) => {
    const result = await surveyService.getAll();

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await surveyService.getById(req.params.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await surveyService.create({
      ...req.body,
      userId: req.user!.id,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await surveyService.update(req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await surveyService.remove(req.params.id);

    res.status(204).send();
  }),
};

export default surveyController;
