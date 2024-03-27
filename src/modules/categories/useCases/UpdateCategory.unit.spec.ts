import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { container } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import MakeAllFactories from '@shared/factories/MakeAllFactories';
import CategoryMock from '@shared/mocks/CategoryMock';
import UpdateCategory from './UpdateCategory';

let updateCategory: UpdateCategory;
let categoryMock: CategoryMock;
let categoriesRepository: ICategoriesRepository;

beforeEach(() => {
	updateCategory = container.resolve(UpdateCategory);
	categoryMock = container.resolve(CategoryMock);
	categoriesRepository = MakeAllFactories.CategoriesRepository();
});

describe('Update category use case', () => {
	it('Should update a category', async () => {
		let name = 'Category';
		const SKUPrefix = 'CA';

		const { category } = await categoryMock.execute({
			name,
			SKUPrefix,
		});

		name = 'New Name';

		const response = await updateCategory.execute({
			id: category.id,
			name,
		});

		const getCategory = await categoriesRepository.findByID({
			id: category.id,
		});

		expect(response.category).toEqual(getCategory.category);
		expect(response.category.id).toEqual(expect.any(String));
		expect(response.category.name).toEqual(name);
		expect(response.category.SKUPrefix).toEqual(expect.any(String));
		expect(response.category.isActive).toEqual(expect.any(Boolean));
		expect(response.category.createdAt).toEqual(expect.any(Date));
		expect(response.category.updatedAt).toEqual(expect.any(Date));
	});
});
