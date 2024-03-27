import CategoryEntity from '../entities/CategoryEntity';
import { inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';

interface IListCategories {
	take?: number;
	skip?: number;
	takeAll?: boolean;
}

interface ListCategoriesRespose {
	categories: CategoryEntity[];
	hasNext: boolean;
}

@injectable()
export default class ListCategories {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute(data?: IListCategories): Promise<ListCategoriesRespose> {
		if (data?.takeAll) {
			const categories: CategoryEntity[] = [];
			let hasNext = true;

			for (let i = 0; hasNext; i++) {
				const take = data.take || 100;
				const skip = i * take;

				const response = await this.categoriesRepository.list({
					skip,
					take,
				});

				categories.push(...response.categories);
				hasNext = response.hasNext;
			}

			return { categories, hasNext };
		}

		const response = await this.categoriesRepository.list(data);

		return response;
	}
}
