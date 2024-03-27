import FindCategoryByID from '@modules/categories/useCases/FindCategoryByID';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class FindCategoryByIDController {
	async execute(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;

			if (!id) {
				const message = `Enter the category ID in request parameters!`;
				res.status(406).send(message);
				return;
			}

			const findCategoriByIDUseCase = container.resolve(FindCategoryByID);

			const { category } = await findCategoriByIDUseCase.execute({ id });

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
