import { NextFunction, Request, Response } from "express";
import surveyService from "../services/surveyService";

const surveyController = {
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await surveyService.getAll();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await surveyService.getById(
        req.params.id
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await surveyService.create(req.body);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await surveyService.update(
        req.params.id,
        req.body
      );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },

  async remove(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await surveyService.remove(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default surveyController;
