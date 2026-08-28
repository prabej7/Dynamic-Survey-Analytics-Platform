import { prisma } from "../../../config/prisma";

const userRepository = {
  async findAll() {
    // TODO: Implement Prisma query
    return [];
  },

  async findById(id: string) {
    // TODO: Implement Prisma query
    return null;
  },

  async create(data: unknown) {
    // TODO: Implement Prisma query
    return data;
  },

  async update(id: string, data: unknown) {
    // TODO: Implement Prisma query
    return data;
  },

  async remove(id: string) {
    // TODO: Implement Prisma query
    return null;
  },
};

export default userRepository;
