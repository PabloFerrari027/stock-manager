import ICategoriesRepository from "modules/categories/repositories/ICategoriesRepository";

import {
  ICreateCategory,
  IDeleteCategory,
  IFindCategoryByID,
  IListCategories,
  IUpdateCategory,
} from "../../repositories/types/params";

import {
  ICreateCategoryResponse,
  IFindCategoryByIDResponse,
  IListCategoriesResponse,
  IUpdateCategoryResponse,
} from "../../repositories/types/responses";

import { inject, injectable } from "tsyringe";

import IORMProvider from "@shared/providers/ORMProvider/models/IORMProvider";
import ICategory from "modules/categories/repositories/types/ICategory";
import CategoryEntity from "modules/categories/entities/CategoryEntity";

@injectable()
export default class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @inject("ORMProvider")
    private ORMProvider: IORMProvider,
  ) {}

  async create(data: ICreateCategory): Promise<ICreateCategoryResponse> {
    const response = await this.ORMProvider.create<ICategory, ICreateCategory>({
      data,
      model: "categories",
    });

    const category = CategoryEntity.create(response);

    return { category };
  }

  async update(data: IUpdateCategory): Promise<IUpdateCategoryResponse> {
    const updatedAt = data.updatedAt || new Date();

    const response = await this.ORMProvider.update<ICategory, IUpdateCategory>({
      id: data.id,
      data: { updatedAt, ...data },
      model: "categories",
    });

    const category = new CategoryEntity(response);

    return { category };
  }

  async findByID(data: IFindCategoryByID): Promise<IFindCategoryByIDResponse> {
    const response = await this.ORMProvider.find<
      ICategory | null,
      IFindCategoryByID
    >({
      key: "id",
      model: "categories",
      data,
    });

    if (!response) return { category: null };

    const category = new CategoryEntity(response);

    return { category };
  }

  async list(data: IListCategories): Promise<IListCategoriesResponse> {
    const take = data.take || 100;
    const skip = data.skip || 0;

    const response = await this.ORMProvider.list<ICategory[], IListCategories>({
      model: "categories",
      skip,
      take,
    });

    const categories: CategoryEntity[] = response.map((item) => {
      const category = CategoryEntity.create(item);
      return category;
    });

    const count = await this.ORMProvider.count({ model: "categories" });

    const hasNext = take + skip < count;

    return { categories, hasNext };
  }

  async delete(data: IDeleteCategory): Promise<void> {
    await this.ORMProvider.delete({
      id: data.id,
      model: "categories",
    });

    return;
  }
}
