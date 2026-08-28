import { Request, Response } from "express";

import asyncHandler from "../../../middlewares/asyncHandler";
import authService from "../services/authService";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    const { user, token } = await authService.register(req.body);

    res.cookie("accessToken", token, COOKIE_OPTIONS);

    res.status(201).json({
      success: true,
      data: user,
    });
  }),

  login: asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { user, token } = await authService.login(email, password);

    res.cookie("accessToken", token, COOKIE_OPTIONS);

    res.status(200).json({
      success: true,
      data: user,
    });
  }),

  logout: asyncHandler(async (_req: Request, res: Response) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  }),

  getProfile: asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.getProfile(req.user!.id);

    res.status(200).json({
      success: true,
      data: result,
    });
  }),
};

export default authController;
