import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../generated/prisma/client";

import {
  ForbiddenError,
  UnauthorizedError,
} from "../utils/AppError";

const roleMiddleware = (...allowedRoles: UserRole[]) => {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        throw new UnauthorizedError(
          "Authentication required"
        );
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new ForbiddenError(
          "Insufficient permissions"
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default roleMiddleware;