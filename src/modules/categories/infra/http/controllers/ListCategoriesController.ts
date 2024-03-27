import ListCategories from '@modules/categories/useCases/ListCategories';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

export default class ListCategoriesController {
	async execute(req: Request, res: Response): Promise<void> {
		try {
			const zodSchema = z.object({
				page: z.number().min(1).optional().default(1),
			});

			const zodResponse = zodSchema.safeParse(req.query);

			if (!zodResponse.success) {
				const message = `Make sure all fields are filled correctly and try again!`;
				res.status(406).send(message);
				return;
			}

			const listCategoriesUseCase = container.resolve(ListCategories);

			const page = zodResponse.data.page;

			const take = 100;
			const skip = take * (page - 1);

			const { categories, hasNext } = await listCategoriesUseCase.execute({
				take,
				skip,
			});

			const categoriesMapped = categories.map(c => ({
				id: c.id,
				is_active: c.isActive,
				SKU_prefix: c.SKUPrefix,
				created_at: c.createdAt,
				updated_at: c.updatedAt,
			}));

			const response = {
				categories: categoriesMapped,
				has_next: hasNext,
			};

			res.json(response);

			return;
		} catch (error) {
			const message = `Unexpected error!`;
			const status = 500;

			res.status(status).send(message);
			return;
		}
	}
}
