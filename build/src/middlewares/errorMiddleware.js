"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../utils/AppError");
const errorMiddleware = (err, _req, res, _next) => {
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json(Object.assign({ success: false, code: err.code, message: err.message }, (err.details && {
            errors: err.details,
        })));
        return;
    }
    res.status(500).json({
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
    });
};
exports.default = errorMiddleware;
