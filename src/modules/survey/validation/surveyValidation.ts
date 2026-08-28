import { z } from "zod";

const questionTypeSchema = z.enum([
  "TEXT",
  "SINGLE_SELECT",
  "MULTI_SELECT",
  "RATING",
]);


const conditionSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),

  operator: z.enum([
    "equals",
    "not_equals",
    "contains",
  ]),

  value: z.union([
    z.string(),
    z.number(),
    z.boolean(),
  ]),
});


const questionSchema = z.object({
  id: z.string().min(1, "Question ID is required"),

  type: questionTypeSchema,

  label: z
    .string()
    .trim()
    .min(1, "Question label is required")
    .max(500, "Question label must not exceed 500 characters"),

  required: z.boolean().default(false),


  options: z
    .array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
      })
    )
    .optional(),

  condition: conditionSchema.optional(),
});


const surveySchemaSchema = z.object({
  questions: z
    .array(questionSchema)
    .min(1, "Survey must contain at least one question"),
});


export const createSurveySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must not exceed 200 characters"),

  description: z
    .string()
    .trim()
    .max(
      1000,
      "Description must not exceed 1000 characters"
    )
    .optional(),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200, "Slug must not exceed 200 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    ),

  schema: surveySchemaSchema,
});


export const updateSurveySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must not exceed 200 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(
      1000,
      "Description must not exceed 1000 characters"
    )
    .optional(),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200, "Slug must not exceed 200 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens"
    )
    .optional(),

  schema: surveySchemaSchema.optional(),

  isPublished: z.boolean().optional(),
});

export type CreateSurveyInput = z.infer<
  typeof createSurveySchema
>;

export type UpdateSurveyInput = z.infer<
  typeof updateSurveySchema
>;