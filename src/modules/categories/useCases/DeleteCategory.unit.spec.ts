import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { container } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import MakeAllFactories from '@shared/factories/MakeAllFactories';
import CategoryMock from '@shared/mocks/CategoryMock';
import DeleteCategory from './DeleteCategory';

let categoriesRepository: ICategoriesRepository;
let categoryMock: CategoryMock;
let deleteCategory: DeleteCategory;

beforeEach(() => {
	categoriesRepository = MakeAllFactories.CategoriesRepository();
	categoryMock = container.resolve(CategoryMock);
	deleteCategory = container.resolve(DeleteCategory);
});

describe('Delete category use case', () => {
	it('Should delete a category', async () => {
		const { category } = await categoryMock.execute({});

		await deleteCategory.execute({ id: category.id });

		const response = await categoriesRepository.findByID({ id: category.id });

		expect(response.category).toEqual(null);
	});
});
