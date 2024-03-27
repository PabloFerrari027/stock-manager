import { container, inject, injectable } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import FindCategoryByID from './FindCategoryByID';
import CategoryNotFoundError from '../errors/CategoryNotFoundError';

interface IDeleteCategory {
	id: string;
}

@injectable()
export default class DeleteCategory {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute({ id }: IDeleteCategory): Promise<void> {
		const findCategoryByID = container.resolve(FindCategoryByID);

		const getCategory = await findCategoryByID.execute({ id });

		if (!getCategory.category) {
			throw CategoryNotFoundError.id(id);
		}

		await this.categoriesRepository.delete({
			id,
		});

		return;
	}
}
