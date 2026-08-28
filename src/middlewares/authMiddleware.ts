import {
  NextFunction,
  Request,
  Response,
} from "express";

import { UnauthorizedError } from "../utils/AppError";
import { verifyToken } from "../utils/jwtUtil";

import userRepository from "../modules/auth/repositories/userRepository";

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new UnauthorizedError(
        "Authentication required"
      );
    }

    const payload = verifyToken(token);

    const user = await userRepository.findById(
      payload.id
    );

    if (!user) {
      throw new UnauthorizedError(
        "User no longer exists"
      );
    }

    const { password, ...safeUser } = user;

    req.user = safeUser;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;