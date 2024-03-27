import CategoryEntity from '../entities/CategoryEntity';
import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IFindCategoryByID {
	id: string;
}

interface FindCategoryByIDRespose {
	category: CategoryEntity | null;
}

@injectable()
export default class FindCategoryByID {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute({ id }: IFindCategoryByID): Promise<FindCategoryByIDRespose> {
		const response = await this.categoriesRepository.findByID({ id });

		return response;
	}
}
