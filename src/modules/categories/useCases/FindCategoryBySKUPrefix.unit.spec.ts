import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { container } from 'tsyringe';
import CategoryMock from '@shared/mocks/CategoryMock';
import FindCategoryBySKUPrefix from './FindCategoryBySKUPrefix';

let categoryMock: CategoryMock;
let findCategoryBySKUPrefix: FindCategoryBySKUPrefix;

beforeEach(() => {
	categoryMock = container.resolve(CategoryMock);
	findCategoryBySKUPrefix = container.resolve(FindCategoryBySKUPrefix);
});

describe('Find category by SKU prefix use case', () => {
	it('Should find a category', async () => {
		const response = await categoryMock.execute({});

		const { category } = await findCategoryBySKUPrefix.execute({
			SKUPrefix: response.category.SKUPrefix,
		});

		expect(category).toEqual(
			expect.objectContaining({
				id: response.category.id,
				name: response.category.name,
				SKUPrefix: response.category.SKUPrefix,
				isActive: response.category.isActive,
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			}),
		);
	});
});
