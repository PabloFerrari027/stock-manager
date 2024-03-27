import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import { container } from 'tsyringe';
import CategoryMock from '@shared/mocks/CategoryMock';
import ListCategories from './ListCategories';
import CategoryEntity from '../entities/CategoryEntity';

let categoryMock: CategoryMock;
let listCategories: ListCategories;

beforeEach(() => {
	categoryMock = container.resolve(CategoryMock);
	listCategories = container.resolve(ListCategories);
});

describe('List categories', () => {
	it('Should list  categories', async () => {
		const count = 15;

		for (let i = 0; i < count; i++) {
			await categoryMock.execute({});
		}

		const response = await listCategories.execute({
			skip: 7,
		});

		expect(response.categories.length).toEqual(8);
		expect(response.hasNext).toEqual(false);

		response.categories.forEach(category => {
			expect(category).toBeInstanceOf(CategoryEntity);
			expect(category.id).toEqual(expect.any(String));
			expect(category.SKUPrefix).toEqual(expect.any(String));
			expect(category.name).toEqual(expect.any(String));
			expect(category.isActive).toEqual(expect.any(Boolean));
			expect(category.createdAt).toEqual(expect.any(Date));
			expect(category.updatedAt).toEqual(expect.any(Date));
		});
	});

	it('Should pagine the response', async () => {
		const count = 16;

		for (let i = 0; i < count; i++) {
			await categoryMock.execute({});
		}

		const response1 = await listCategories.execute({
			take: count / 2,
		});

		expect(response1.categories.length).toEqual(count / 2);
		expect(response1.hasNext).toEqual(true);

		const response2 = await listCategories.execute({
			skip: count / 2,
		});

		expect(response2.categories.length).toEqual(count / 2);
		expect(response2.hasNext).toEqual(false);
	});

	it('Should list all data', async () => {
		const count = 150;

		for (let i = 0; i < count; i++) {
			await categoryMock.execute({});
		}

		const response = await listCategories.execute({
			takeAll: true,
		});

		expect(response.categories.length).toEqual(count);
		expect(response.hasNext).toEqual(false);
	});
});
