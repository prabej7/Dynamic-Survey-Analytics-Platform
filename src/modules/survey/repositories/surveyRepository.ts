import { prisma } from "../../../config/prisma";
import { CreateSurveyInput, UpdateSurveyInput } from "../types/surveyType";

import { paginate } from "../../../utils/pagination";

const surveyRepository = {
  async findAll(page?: number, limit?: number) {
    return paginate(
      prisma.survey,
      {
        page,
        limit,
      },
      {
        orderBy: {
          createdAt: "desc",
        },
      },
    );
  },

  async findById(id: string) {
    return prisma.survey.findUnique({
      where: { id },
    });
  },

  async create(data: CreateSurveyInput) {
    return prisma.survey.create({
      data,
    });
  },

  async update(id: string, data: UpdateSurveyInput) {
    return prisma.survey.update({
      where: { id },
      data,
    });
  },

  async remove(id: string) {
    return prisma.survey.delete({
      where: { id },
    });
  },
};

export default surveyRepository;
