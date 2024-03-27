import CategoryNotFoundError from '@modules/categories/errors/CategoryNotFoundError';
import CreateCategoryUseCase from '@modules/categories/useCases/CreateCategory';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

export default class CreateCategoryController {
	async execute(req: Request, res: Response): Promise<void> {
		try {
			const zodSchema = z.object({
				name: z.string(),
				sku_prefix: z.string(),
			});

			const zodResponse = zodSchema.safeParse(req.body);

			if (!zodResponse.success) {
				const message = `Make sure all fields are filled correctly and try again!`;
				res.status(406).send(message);
				return;
			}

			const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

			const name = zodResponse.data.name;
			const SKUPrefix = zodResponse.data.sku_prefix;

			const { category } = await createCategoryUseCase.execute({
				name,
				SKUPrefix,
			});

			const response = {
				id: category.id,
				is_active: category.isActive,
				SKU_prefix: category.SKUPrefix,
				created_at: category.createdAt,
				updated_at: category.updatedAt,
			};

			res.json(response);

			return;
		} catch (error) {
			if (error instanceof CategoryNotFoundError) {
				const message = error.message;
				const status = error.status;

				res.status(status).send(message);

				return;
			}

			const message = `Unexpected error!`;
			const status = 500;

			res.status(status).send(message);
			return;
		}
	}
}
