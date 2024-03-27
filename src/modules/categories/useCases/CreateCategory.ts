import { inject, injectable } from 'tsyringe';
import CategoryEntity from '../entities/CategoryEntity';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface ICreateCategory {
	name: string;
	SKUPrefix: string;
}

interface ICreateCategoryResponse {
	category: CategoryEntity;
}

@injectable()
export default class CreateCategory {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute(data: ICreateCategory): Promise<ICreateCategoryResponse> {
		const response = await this.categoriesRepository.create({
			...data,
			isActive: true,
		});

		return response;
	}
}
