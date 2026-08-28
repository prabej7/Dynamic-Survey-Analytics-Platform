"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSurveySchema = exports.createSurveySchema = void 0;
const zod_1 = require("zod");
const questionTypeSchema = zod_1.z.enum([
    "TEXT",
    "SINGLE_SELECT",
    "MULTI_SELECT",
    "RATING",
]);
const conditionSchema = zod_1.z.object({
    questionId: zod_1.z.string().min(1, "Question ID is required"),
    operator: zod_1.z.enum([
        "equals",
        "not_equals",
        "contains",
    ]),
    value: zod_1.z.union([
        zod_1.z.string(),
        zod_1.z.number(),
        zod_1.z.boolean(),
    ]),
});
const questionSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, "Question ID is required"),
    type: questionTypeSchema,
    label: zod_1.z
        .string()
        .trim()
        .min(1, "Question label is required")
        .max(500, "Question label must not exceed 500 characters"),
    required: zod_1.z.boolean().default(false),
    options: zod_1.z
        .array(zod_1.z.object({
        value: zod_1.z.string().min(1),
        label: zod_1.z.string().min(1),
    }))
        .optional(),
    condition: conditionSchema.optional(),
});
const surveySchemaSchema = zod_1.z.object({
    questions: zod_1.z
        .array(questionSchema)
        .min(1, "Survey must contain at least one question"),
});
exports.createSurveySchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title must not exceed 200 characters"),
    description: zod_1.z
        .string()
        .trim()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),
    slug: zod_1.z
        .string()
        .trim()
        .min(1, "Slug is required")
        .max(200, "Slug must not exceed 200 characters")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
    schema: surveySchemaSchema,
});
exports.updateSurveySchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(200, "Title must not exceed 200 characters")
        .optional(),
    description: zod_1.z
        .string()
        .trim()
        .max(1000, "Description must not exceed 1000 characters")
        .optional(),
    slug: zod_1.z
        .string()
        .trim()
        .min(1, "Slug is required")
        .max(200, "Slug must not exceed 200 characters")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must contain only lowercase letters, numbers, and hyphens")
        .optional(),
    schema: surveySchemaSchema.optional(),
    isPublished: zod_1.z.boolean().optional(),
});
