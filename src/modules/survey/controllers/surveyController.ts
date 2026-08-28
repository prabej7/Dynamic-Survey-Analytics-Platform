import { Request, Response } from "express";

import asyncHandler from "../../../middlewares/asyncHandler";
import surveyAnalyticsService from "../services/surveyAnalyticsService";
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

  publish: asyncHandler(async (req: Request, res: Response) => {
    const result = await surveyService.publish(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Survey published successfully",
      data: result,
    });
  }),

  findBySlug: asyncHandler(async (req: Request, res: Response) => {
    const result = await surveyService.findBySlug(req.params.slug);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

   analytics: asyncHandler(
    async (req: Request, res: Response) => {
      const result =
        await surveyAnalyticsService.getAnalytics(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    }
  ),
};

export default surveyController;
