import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import CreateCategory from './CreateCategory';
import { container } from 'tsyringe';
import ICategoriesRepository from '../repositories/ICategoriesRepository';
import MakeAllFactories from '@shared/factories/MakeAllFactories';

let createCategory: CreateCategory;
let categoriesRepository: ICategoriesRepository;

beforeEach(() => {
	createCategory = container.resolve(CreateCategory);
	categoriesRepository = MakeAllFactories.CategoriesRepository();
});

describe('Create category use case', () => {
	it('Should create a category', async () => {
		const name = 'category';
		const SKUPrefix = 'CA';

		const { category } = await createCategory.execute({
			name,
			SKUPrefix,
		});

		const response = await categoriesRepository.findByID({ id: category.id });

		expect(response.category).toEqual(category);
		expect(category.id).toEqual(expect.any(String));
		expect(category.name).toEqual(expect.any(String));
		expect(category.SKUPrefix).toEqual(expect.any(String));
		expect(category.isActive).toEqual(expect.any(Boolean));
		expect(category.createdAt).toEqual(expect.any(Date));
		expect(category.updatedAt).toEqual(expect.any(Date));
	});
});
