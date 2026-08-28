// src/modules/dashboard/controllers/dashboardController.ts

import { Request, Response } from "express";

import asyncHandler from "../../../middlewares/asyncHandler";

import dashboardService from "../services/dashboardService";

const dashboardController = {
  getAnalytics: asyncHandler(
    async (req: Request, res: Response) => {
      const result =
        await dashboardService.getAnalytics(
          req.user!.id
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    }
  ),
};

export default dashboardController;