import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";

const userController = {
  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await userService.getAll();

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
      const result = await userService.getById(
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
      const result = await userService.create(req.body);

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
      const result = await userService.update(
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
      await userService.remove(req.params.id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
