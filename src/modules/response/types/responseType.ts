import { Prisma } from "../../../../generated/prisma/client";

export interface CreateResponseInput {
  surveyId: string;
  answers: Prisma.InputJsonValue;
}

export interface UpdateResponseInput {
  answers?: Prisma.InputJsonValue;
}