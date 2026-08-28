import surveyRepository from "../repositories/surveyRepository";
import { CreateSurveyInput, UpdateSurveyInput } from "../types/surveyType";

const surveyService = {
  async getAll() {
    return surveyRepository.findAll();
  },

  async getById(id: string) {
    return surveyRepository.findById(id);
  },

  async create(data: CreateSurveyInput) {
    return surveyRepository.create(data);
  },

  async update(id: string, data: UpdateSurveyInput) {
    return surveyRepository.update(id, data);
  },

  async remove(id: string) {
    return surveyRepository.remove(id);
  },
};

export default surveyService;
