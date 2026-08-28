import { Request, Response } from "express";

import asyncHandler from "../../../middlewares/asyncHandler";
import responseService from "../services/responseService";

const responseController = {
  getAll: asyncHandler(async (_req: Request, res: Response) => {
    const result = await responseService.getAll();

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const result = await responseService.getById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  getBySurveyId: asyncHandler(
    async (req: Request, res: Response) => {
      const result = await responseService.getBySurveyId(
        req.params.surveyId
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    }
  ),

  create: asyncHandler(async (req: Request, res: Response) => {
    const result = await responseService.create({
      surveyId: req.params.surveyId,
      answers: req.body.answers,
    });

    res.status(201).json({
      success: true,
      data: result,
    });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const result = await responseService.update(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await responseService.remove(req.params.id);

    res.status(204).send();
  }),
};

export default responseController;