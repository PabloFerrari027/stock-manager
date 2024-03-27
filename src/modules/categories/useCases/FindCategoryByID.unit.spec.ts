import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { container } from 'tsyringe';
import CategoryMock from '@shared/mocks/CategoryMock';
import FindCategoryByID from './FindCategoryByID';

let categoryMock: CategoryMock;
let findCategoryByID: FindCategoryByID;

beforeEach(() => {
	categoryMock = container.resolve(CategoryMock);
	findCategoryByID = container.resolve(FindCategoryByID);
});

describe('Find category by id use case', () => {
	it('Should find a category', async () => {
		const response = await categoryMock.execute({});

		const { category } = await findCategoryByID.execute({
			id: response.category.id,
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
