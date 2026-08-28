import { Prisma } from "../../../../generated/prisma/client";

export interface CreateSurveyInput {
  userId: string;
  title: string;
  description?: string;
  slug: string;
  schema: Prisma.InputJsonValue;
}

export interface UpdateSurveyInput {
  title?: string;
  description?: string;
  slug?: string;
  schema?: Prisma.InputJsonValue;
  isPublished?: boolean;
}