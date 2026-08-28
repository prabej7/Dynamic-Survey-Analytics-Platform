import responseRepository from "../repositories/responseRepository";
import { CreateResponseInput, UpdateResponseInput } from "../types/responseType";

const responseService = {
  async getAll() {
    return responseRepository.findAll();
  },

  async getById(id: string) {
    return responseRepository.findById(id);
  },

  async create(data: CreateResponseInput) {
    return responseRepository.create(data);
  },

  async update(id: string, data: UpdateResponseInput) {
    return responseRepository.update(id, data);
  },

  async remove(id: string) {
    return responseRepository.remove(id);
  },

  async getBySurveyId(surveyId: string) {
    return responseRepository.findBySurveyId(surveyId);
  },
};

export default responseService;
