import { NextFunction, Request, RequestHandler, Response } from "express";

import { ZodSchema } from "zod";

import { ValidationError } from "../utils/AppError";

export const sanitize = <T>(schema: ZodSchema<T>): RequestHandler => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new ValidationError("Validation failed", errors));
    }

    req.body = result.data;

    next();
  };
};
