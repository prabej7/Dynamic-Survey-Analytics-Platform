"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must not exceed 100 characters"),
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must not exceed 100 characters"),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),
    password: zod_1.z
        .string()
        .min(1, "Password is required"),
});
exports.updatePasswordSchema = zod_1.z
    .object({
    currentPassword: zod_1.z
        .string()
        .min(1, "Current password is required"),
    newPassword: zod_1.z
        .string()
        .min(8, "New password must be at least 8 characters")
        .max(100, "New password must not exceed 100 characters"),
    confirmPassword: zod_1.z
        .string()
        .min(1, "Please confirm your new password"),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
