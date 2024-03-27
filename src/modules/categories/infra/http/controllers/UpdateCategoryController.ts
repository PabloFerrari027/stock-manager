import UpdateCategory from '@modules/categories/useCases/UpdateCategory';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

export default class UpdateCategoryController {
	async execute(req: Request, res: Response): Promise<void> {
		try {
			const zodSchema = z.object({
				name: z.string().optional(),
				sku_prefix: z.string().optional(),
			});

			const zodResponse = zodSchema.safeParse(req.body);

			const id = req.params.id;

			if (!zodResponse.success || !id) {
				const message = `Make sure all fields are filled correctly and try again!`;
				res.status(406).send(message);
				return;
			}

			const updateCategoryUseCase = container.resolve(UpdateCategory);

			const name = zodResponse.data.name;
			const SKUPrefix = zodResponse.data.sku_prefix;

			const { category } = await updateCategoryUseCase.execute({
				id,
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
			const message = `Unexpected error!`;
			const status = 500;

			res.status(status).send(message);
			return;
		}
	}
}
