import { z } from "zod";

export const createResponseSchema = z.object({
  answers: z
    .record(z.string(), z.unknown())
    .refine(
      (answers) => Object.keys(answers).length > 0,
      {
        message: "At least one answer is required",
      }
    ),
});

export const updateResponseSchema = z.object({
  answers: z
    .record(z.string(), z.unknown())
    .refine(
      (answers) => Object.keys(answers).length > 0,
      {
        message: "At least one answer is required",
      }
    ),
});

export type CreateResponseRequest = z.infer<
  typeof createResponseSchema
>;

export type UpdateResponseRequest = z.infer<
  typeof updateResponseSchema
>;