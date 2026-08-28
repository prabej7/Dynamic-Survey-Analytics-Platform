"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../utils/AppError");
const roleMiddleware = (...allowedRoles) => {
    return (req, _res, next) => {
        try {
            if (!req.user) {
                throw new AppError_1.UnauthorizedError("Authentication required");
            }
            if (!allowedRoles.includes(req.user.role)) {
                throw new AppError_1.ForbiddenError("Insufficient permissions");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = roleMiddleware;
