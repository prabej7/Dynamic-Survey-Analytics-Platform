import userRepository from "../repositories/userRepository";
import { CreateUserInput, UpdateUserInput } from "../types/userType";

const userService = {
  async getAll() {
    return userRepository.findAll();
  },

  async getById(id: string) {
    return userRepository.findById(id);
  },

  async create(data: CreateUserInput) {
    return userRepository.create(data);
  },

  async update(id: string, data: UpdateUserInput) {
    return userRepository.update(id, data);
  },

  async remove(id: string) {
    return userRepository.remove(id);
  },
};

export default userService;
