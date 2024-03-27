import 'reflect-metadata';
import { beforeEach, describe, expect, it } from 'vitest';
import MakeAllFactories from '@shared/factories/MakeAllFactories';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import app from '@shared/infra/http/app';
import request from 'supertest';

let categoriesRepository: ICategoriesRepository;

beforeEach(() => {
	categoriesRepository = MakeAllFactories.CategoriesRepository();
});

describe('Create category use case', () => {
	it('Should create a category', async () => {
		const body = {
			name: 'Category',
			sku_prefix: 'CA',
		};

		const response = await request(app).post(`/categories/create`).send(body);

		expect(response.status).toEqual(200);

		expect(response.body.id).toEqual(expect.any(String));
		expect(response.body.name).toEqual(expect.any(String));
		expect(response.body.SKUPrefix).toEqual(expect.any(String));
		expect(response.body.isActive).toEqual(expect.any(Boolean));
		expect(response.body.createdAt).toEqual(expect.any(Date));
		expect(response.body.updatedAt).toEqual(expect.any(Date));

		const { category } = await categoriesRepository.findByID({
			id: response.body.id,
		});

		expect(response.body.id).toEqual(category?.id);
		expect(response.body.name).toEqual(category?.name);
		expect(response.body.SKUPrefix).toEqual(category?.SKUPrefix);
		expect(response.body.isActive).toEqual(category?.isActive);
		expect(response.body.createdAt).toEqual(category?.createdAt);
		expect(response.body.updatedAt).toEqual(category?.updatedAt);
	});
});
