import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';
import CategoryEntity from '@modules/categories/entities/CategoryEntity';

interface ICategoryMock {
	name?: string;
	SKUPrefix?: string;
	isActive?: boolean;
}

interface ICategoryMockResponse {
	category: CategoryEntity;
}

@injectable()
export default class CategoryMock {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute(data?: ICategoryMock): Promise<ICategoryMockResponse> {
		const SKUPrefix = data?.SKUPrefix ?? 'CA';
		const name = data?.name ?? 'Category';
		const isActive = data?.isActive ?? false;

		const response = await this.categoriesRepository.create({
			SKUPrefix,
			name,
			isActive,
		});

		return response;
	}
}
