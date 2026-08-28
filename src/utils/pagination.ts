import { Prisma } from "../../generated/prisma/client";

interface PaginationParams {
  page?: number;
  limit?: number;
}

interface PaginationOptions {
  where?: Prisma.InputJsonObject;
  orderBy?: Record<string, "asc" | "desc">;
}

interface PaginationResult<T> {
  data: T[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface PaginatedModel<T> {
  findMany: (args: {
    skip: number;
    take: number;
    where?: any;
    orderBy?: any;
  }) => Promise<T[]>;

  count: (args: { where?: any }) => Promise<number>;
}

export const paginate = async <T>(
  model: PaginatedModel<T>,
  params: PaginationParams = {},
  options: PaginationOptions = {},
): Promise<PaginationResult<T>> => {
  const page = Math.max(1, Number(params.page) || 1);

  const limit = Math.min(100, Math.max(1, Number(params.limit) || 10));

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({
      skip,
      take: limit,
      where: options.where,
      orderBy: options.orderBy,
    }),

    model.count({
      where: options.where,
    }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};
