import { inject, injectable } from 'tsyringe';
import CategoryEntity from '../entities/CategoryEntity';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IFindCategoryBySKUPrefix {
	SKUPrefix: string;
}

interface IFindCategoryBySKUPrefixResponse {
	category: CategoryEntity | null;
}

@injectable()
export default class FindCategoryBySKUPrefix {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute({
		SKUPrefix,
	}: IFindCategoryBySKUPrefix): Promise<IFindCategoryBySKUPrefixResponse> {
		const { category } = await this.categoriesRepository.findBySKUPrefix({
			SKUPrefix,
		});

		return { category };
	}
}
