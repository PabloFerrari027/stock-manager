import { container, inject, injectable } from 'tsyringe';
import CategoryEntity from '../entities/CategoryEntity';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import FindCategoryByID from './FindCategoryByID';
import CategoryNotFoundError from '../errors/CategoryNotFoundError';

interface IUpdateCategory {
	id: string;
	name?: string;
	SKUPrefix?: string;
}

interface IUpdateCategoryResponse {
	category: CategoryEntity;
}

@injectable()
export default class UpdateCategory {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute(data: IUpdateCategory): Promise<IUpdateCategoryResponse> {
		const findCategoryByID = container.resolve(FindCategoryByID);

		const getCategory = await findCategoryByID.execute({ id: data.id });

		if (!getCategory.category) {
			throw CategoryNotFoundError.id(data.id);
		}

		const response = await this.categoriesRepository.update(data);

		return response;
	}
}
