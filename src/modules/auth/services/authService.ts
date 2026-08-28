import bcrypt from "bcrypt";

import userRepository from "../repositories/userRepository";

import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../../utils/AppError";

import { generateToken } from "../../../utils/jwtUtil";

import { CreateUserInput } from "../types/userType";

const authService = {
  async register(data: CreateUserInput) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError("Email is already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password: _, ...safeUser } = user;

    return {
      user: safeUser,
      token,
    };
  },
  
  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password: _, ...safeUser } = user;

    return {
      user: safeUser,
      token,
    };
  },

  async getProfile(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const { password, ...safeUser } = user;

    return safeUser;
  },
};

export default authService;
