import { prisma } from "../../../config/prisma";
import { CreateUserInput, UpdateUserInput } from "../types/userType";

const userRepository = {
  async findAll() {
    return await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  async create(data: CreateUserInput) {
    return await prisma.user.create({
      data,
    });
  },

  async update(id: string, data: UpdateUserInput) {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },

  async remove(id: string) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  },
};

export default userRepository;
