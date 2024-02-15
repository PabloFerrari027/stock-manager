import {
  ICreateCategory,
  IDeleteCategory,
  IFindCategoryByID,
  IListCategories,
  IUpdateCategory,
} from "./types/params";

import {
  ICreateCategoryResponse,
  IFindCategoryByIDResponse,
  IListCategoriesResponse,
  IUpdateCategoryResponse,
} from "./types/responses";

export default interface ICategoriesRepository {
  create(data: ICreateCategory): Promise<ICreateCategoryResponse>;
  update(data: IUpdateCategory): Promise<IUpdateCategoryResponse>;
  findByID(data: IFindCategoryByID): Promise<IFindCategoryByIDResponse>;
  list(data: IListCategories): Promise<IListCategoriesResponse>;
  delete(data: IDeleteCategory): Promise<void>;
}
