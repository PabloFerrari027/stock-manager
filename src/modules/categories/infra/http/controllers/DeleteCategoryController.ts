import CategoryNotFoundError from '@modules/categories/errors/CategoryNotFoundError';
import DeleteCategory from '@modules/categories/useCases/DeleteCategory';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class DeleteCategoryController {
	async execute(req: Request, res: Response): Promise<void> {
		try {
			const id = req.params.id;

			const deleteCategoryUseCase = container.resolve(DeleteCategory);

			await deleteCategoryUseCase.execute({
				id,
			});

			const message = `Category deleted with success!`;

			res.send(message);

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
