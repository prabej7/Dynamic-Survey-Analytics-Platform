import { NextFunction, Request, Response } from "express";

import { AppError } from "../utils/AppError";

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
      ...(err.details && {
        errors: err.details,
      }),
    });
    return;
  }

  res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  });
};

export default errorMiddleware;
