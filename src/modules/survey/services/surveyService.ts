import { NotFoundError } from "../../../utils/AppError";
import surveyRepository from "../repositories/surveyRepository";
import { CreateSurveyInput, UpdateSurveyInput } from "../types/surveyType";

const surveyService = {
  async getAll() {
    return surveyRepository.findAll();
  },

  async getById(id: string) {
    const existingSurvey = await surveyRepository.findById(id);
    if (!existingSurvey) {
      throw new NotFoundError(`Survey with ID ${id} not found`);
    }
    return surveyRepository.findById(id);
  },

  async create(data: CreateSurveyInput) {
    return surveyRepository.create(data);
  },

  async update(id: string, data: UpdateSurveyInput) {
    const existingSurvey = await surveyRepository.findById(id);
    if (!existingSurvey) {
      throw new NotFoundError(`Survey with ID ${id} not found`);
    }
    return surveyRepository.update(id, data);
  },

  async remove(id: string) {
    const existingSurvey = await surveyRepository.findById(id);
    if (!existingSurvey) {
      throw new NotFoundError(`Survey with ID ${id} not found`);
    }
    return surveyRepository.remove(id);
  },

  async publish(id: string) {
    return await surveyRepository.update(id, {
      isPublished: true,
    });
  },
};

export default surveyService;
