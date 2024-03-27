import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import {
	ICreateCategory,
	IDeleteCategory,
	IFindBySKUPrefix,
	IFindCategoryByID,
	IListCategories,
	IUpdateCategory,
} from '../../repositories/types/params';

import {
	ICreateCategoryResponse,
	IFindBySKUPrefixResponse,
	IFindCategoryByIDResponse,
	IListCategoriesResponse,
	IUpdateCategoryResponse,
} from '../../repositories/types/responses';

import { injectable } from 'tsyringe';

import CategoryEntity from '@modules/categories/entities/CategoryEntity';
import prisma from '@shared/infra/prisma/postgreSQL';

@injectable()
export default class CategoriesRepository implements ICategoriesRepository {
	async create(data: ICreateCategory): Promise<ICreateCategoryResponse> {
		const response = await prisma.categories.create({
			data,
		});

		const category = CategoryEntity.create(response);

		return { category };
	}

	async update(data: IUpdateCategory): Promise<IUpdateCategoryResponse> {
		const updatedAt = data.updatedAt || new Date();

		const response = await prisma.categories.update({
			data: { updatedAt, ...data },
			where: { id: data.id },
		});

		const category = new CategoryEntity(response);

		return { category };
	}

	async findByID({
		id,
	}: IFindCategoryByID): Promise<IFindCategoryByIDResponse> {
		const response = await prisma.categories.findUnique({
			where: { id },
		});

		if (!response) return { category: null };

		const category = new CategoryEntity(response);

		return { category };
	}

	async findBySKUPrefix({
		SKUPrefix,
	}: IFindBySKUPrefix): Promise<IFindBySKUPrefixResponse> {
		const response = await prisma.categories.findFirst({
			where: { SKUPrefix },
		});

		if (!response) return { category: null };

		const category = new CategoryEntity(response);

		return { category };
	}

	async list(data: IListCategories): Promise<IListCategoriesResponse> {
		const take = data.take || 100;
		const skip = data.skip || 0;

		const response = await prisma.categories.findMany({
			skip,
			take,
		});

		const categories: CategoryEntity[] = response.map(item => {
			const category = CategoryEntity.create(item);
			return category;
		});

		const count = await prisma.categories.count();

		const hasNext = take + skip < count;

		return { categories, hasNext };
	}

	async delete({ id }: IDeleteCategory): Promise<void> {
		await prisma.categories.delete({
			where: { id },
		});

		return;
	}
}
