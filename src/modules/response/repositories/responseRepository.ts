import { prisma } from "../../../config/prisma";

import {
  CreateResponseInput,
  UpdateResponseInput,
} from "../types/responseType";

const responseRepository = {
  async findAll() {
    return await prisma.response.findMany({
      orderBy: {
        submittedAt: "desc",
      },
    });
  },

  async findById(id: string) {
    return await prisma.response.findUnique({
      where: {
        id,
      },
    });
  },

  async findBySurveyId(surveyId: string) {
    return await prisma.response.findMany({
      where: {
        surveyId,
      },
      orderBy: {
        submittedAt: "desc",
      },
    });
  },

  async create(data: CreateResponseInput) {
    return await prisma.response.create({
      data,
    });
  },

  async update(
    id: string,
    data: UpdateResponseInput
  ) {
    return await prisma.response.update({
      where: {
        id,
      },
      data,
    });
  },

  async remove(id: string) {
    return await prisma.response.delete({
      where: {
        id,
      },
    });
  },

  async countBySurveyId(surveyId: string) {
    return await prisma.response.count({
      where: {
        surveyId,
      },
    });
  },
};

export default responseRepository;