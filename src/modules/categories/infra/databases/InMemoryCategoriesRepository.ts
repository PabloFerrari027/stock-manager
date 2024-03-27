import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import {
	ICreateCategory,
	IDeleteCategory,
	IFindBySKUPrefix,
	IFindCategoryByID,
	IListCategories,
	IUpdateCategory,
} from '@modules/categories/repositories/types/params';

import {
	ICreateCategoryResponse,
	IFindBySKUPrefixResponse,
	IFindCategoryByIDResponse,
	IListCategoriesResponse,
	IUpdateCategoryResponse,
} from '@modules/categories/repositories/types/responses';
import ICategory from '@modules/categories/repositories/types/ICategory';
import CategoryEntity from '@modules/categories/entities/CategoryEntity';

export default class InMemoryCategoriesRepository
	implements ICategoriesRepository
{
	private categories: ICategory[] = [];

	async create(params: ICreateCategory): Promise<ICreateCategoryResponse> {
		const data = {
			...params,
			isActive: params.isActive ?? true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const category = CategoryEntity.create(data);

		this.categories.push({
			id: category.id,
			...data,
		});

		return { category };
	}

	async update(params: IUpdateCategory): Promise<IUpdateCategoryResponse> {
		const index = this.categories.findIndex(item => item.id === params.id);
		const getCategory = this.categories[index];

		const data: ICategory = { ...getCategory, ...params };

		this.categories[index] = data;

		const category = CategoryEntity.create(data);

		return { category };
	}

	async findByID({
		id,
	}: IFindCategoryByID): Promise<IFindCategoryByIDResponse> {
		const response = this.categories.find(item => item.id === id) || null;

		if (!response) return { category: null };

		const category = CategoryEntity.create(response);

		return { category };
	}

	async findBySKUPrefix({
		SKUPrefix,
	}: IFindBySKUPrefix): Promise<IFindBySKUPrefixResponse> {
		const response =
			this.categories.find(item => item.SKUPrefix === SKUPrefix) || null;

		if (!response) return { category: null };

		const category = CategoryEntity.create(response);

		return { category };
	}

	async list(data: IListCategories): Promise<IListCategoriesResponse> {
		const skip = data?.skip || 0;
		const take = data?.take || 10;

		const response = this.categories.slice(skip, skip + take);

		const categories = response.map(category =>
			CategoryEntity.create(category),
		);

		const hasNext = this.categories.length > skip + take;

		return { categories, hasNext };
	}

	async delete({ id }: IDeleteCategory): Promise<void> {
		const index = this.categories.findIndex(item => item.id === id);
		this.categories.splice(index, 1);
	}
}
