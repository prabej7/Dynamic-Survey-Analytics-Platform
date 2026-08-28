import responseRepository from "../repositories/responseRepository";

const responseService = {
  async getAll() {
    return responseRepository.findAll();
  },

  async getById(id: string) {
    return responseRepository.findById(id);
  },

  async create(data: unknown) {
    return responseRepository.create(data);
  },

  async update(id: string, data: unknown) {
    return responseRepository.update(id, data);
  },

  async remove(id: string) {
    return responseRepository.remove(id);
  },
};

export default responseService;
