"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateResponseSchema = exports.createResponseSchema = void 0;
const zod_1 = require("zod");
exports.createResponseSchema = zod_1.z.object({
    answers: zod_1.z
        .record(zod_1.z.string(), zod_1.z.unknown())
        .refine((answers) => Object.keys(answers).length > 0, {
        message: "At least one answer is required",
    }),
});
exports.updateResponseSchema = zod_1.z.object({
    answers: zod_1.z
        .record(zod_1.z.string(), zod_1.z.unknown())
        .refine((answers) => Object.keys(answers).length > 0, {
        message: "At least one answer is required",
    }),
});
