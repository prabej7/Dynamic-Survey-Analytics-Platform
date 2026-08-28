"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = void 0;
const AppError_1 = require("../utils/AppError");
const sanitize = (schema) => {
    return (req, _res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            return next(new AppError_1.ValidationError("Validation failed", errors));
        }
        req.body = result.data;
        next();
    };
};
exports.sanitize = sanitize;
