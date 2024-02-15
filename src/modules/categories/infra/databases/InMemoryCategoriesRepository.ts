import ICategoriesRepository from "modules/categories/repositories/ICategoriesRepository";

import {
  ICreateCategory,
  IDeleteCategory,
  IFindCategoryByID,
  IListCategories,
  IUpdateCategory,
} from "modules/categories/repositories/types/params";

import {
  ICreateCategoryResponse,
  IFindCategoryByIDResponse,
  IListCategoriesResponse,
  IUpdateCategoryResponse,
} from "modules/categories/repositories/types/responses";

export default class InMemoryCategoriesRepository
  implements ICategoriesRepository
{
  create(data: ICreateCategory): Promise<ICreateCategoryResponse> {
    throw new Error("Method not implemented.");
  }
  update(data: IUpdateCategory): Promise<IUpdateCategoryResponse> {
    throw new Error("Method not implemented.");
  }
  findByID(data: IFindCategoryByID): Promise<IFindCategoryByIDResponse> {
    throw new Error("Method not implemented.");
  }
  list(data: IListCategories): Promise<IListCategoriesResponse> {
    throw new Error("Method not implemented.");
  }
  delete(data: IDeleteCategory): Promise<void> {}
}
