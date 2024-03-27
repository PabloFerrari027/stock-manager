import FindCategoryBySKUPrefix from '@modules/categories/useCases/FindCategoryBySKUPrefix';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { z } from 'zod';

export default class FindCategoryBySKUPrefixController {
	async execute(req: Request, res: Response): Promise<void> {
		try {
			const zodSchema = z.object({
				sku_prefix: z.string(),
			});

			const zodResponse = zodSchema.safeParse(req.query);

			if (!zodResponse.success) {
				const message = `Make sure all fields are filled correctly and try again!`;
				res.status(406).send(message);
				return;
			}

			const findCategoriBySKUPrefixUseCase = container.resolve(
				FindCategoryBySKUPrefix,
			);

			const SKUPrefix = zodResponse.data.sku_prefix;

			const { category } = await findCategoriBySKUPrefixUseCase.execute({
				SKUPrefix,
			});

			if (!category) {
				const message = `Cagtegory not found!`;
				res.status(404).send(message);
				return;
			}

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
