import prisma from "@shared/infra/prisma/postgreSQL";
import IORMProvider from "../models/IORMProvider";
import {
  ICount,
  ICreate,
  IDelete,
  IFind,
  IList,
  IUpdate,
} from "../models/types";

export default class PrismaORMProvider implements IORMProvider {
  async count<T>(params: ICount<T>): Promise<number> {
    const count = await prisma[params.model].count();

    return count;
  }

  async create<T, D>(params: ICreate<D>): Promise<T> {
    const response = await prisma[params.model].create({
      data: params.data as any,
    });

    return response as T;
  }

  async update<T, D>(params: IUpdate<D>): Promise<T> {
    const response = await prisma[params.model].update({
      data: params.data as any,
      where: { id: params.id },
    });

    return response as T;
  }

  async find<T, D>(params: IFind<D>): Promise<T> {
    const response = await prisma[params.model].findFirst({
      where: { [params.key]: params.data[params.key] },
    });

    return response as T;
  }

  async list<T, D>(params: IList<D>): Promise<T> {
    const take = params.take || 100;
    const skip = params.skip || 0;

    if (params.key && params.data) {
      const response = await prisma[params.model].findMany({
        where: { [params.key]: params.data[params.key] },
        take,
        skip,
      });

      return response as T;
    }

    const response = await prisma[params.model].findMany({
      take,
      skip,
    });

    return response as T;
  }

  async delete(params: IDelete): Promise<void> {
    await prisma[params.model].delete({
      where: { id: params.id },
    });

    return;
  }
}
