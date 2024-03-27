import {
	ICreateCategory,
	IDeleteCategory,
	IFindCategoryByID,
	IListCategories,
	IUpdateCategory,
	IFindBySKUPrefix,
} from './types/params';

import {
	ICreateCategoryResponse,
	IFindCategoryByIDResponse,
	IListCategoriesResponse,
	IUpdateCategoryResponse,
	IFindBySKUPrefixResponse,
} from './types/responses';

export default interface ICategoriesRepository {
	create(data: ICreateCategory): Promise<ICreateCategoryResponse>;
	update(data: IUpdateCategory): Promise<IUpdateCategoryResponse>;
	findByID(data: IFindCategoryByID): Promise<IFindCategoryByIDResponse>;
	findBySKUPrefix(data: IFindBySKUPrefix): Promise<IFindBySKUPrefixResponse>;
	list(data?: IListCategories): Promise<IListCategoriesResponse>;
	delete(data: IDeleteCategory): Promise<void>;
}
