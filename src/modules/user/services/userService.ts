import userRepository from "../repositories/userRepository";

const userService = {
  async getAll() {
    return userRepository.findAll();
  },

  async getById(id: string) {
    return userRepository.findById(id);
  },

  async create(data: unknown) {
    return userRepository.create(data);
  },

  async update(id: string, data: unknown) {
    return userRepository.update(id, data);
  },

  async remove(id: string) {
    return userRepository.remove(id);
  },
};

export default userService;
