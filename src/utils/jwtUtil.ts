import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "./AppError";
dotenv.config();

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_EXPIRES_IN =
  (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];

export const generateToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyToken = (
  token: string
): JwtPayload => {
  try {
    return jwt.verify(
      token,
      JWT_SECRET
    ) as JwtPayload;
  } catch {
    throw new UnauthorizedError(
      "Invalid or expired token"
    );
  }
};