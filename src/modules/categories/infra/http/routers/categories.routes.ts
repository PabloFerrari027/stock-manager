import { Router } from 'express';
import { container } from 'tsyringe';
import FindCategoryByIDController from '../controllers/FindCategoryByIDController';
import FindCategoryBySKUPrefixController from '../controllers/FindCategoryBySKUPrefixController';
import ListCategoriesController from '../controllers/ListCategoriesController';
import CreateCategoryController from '../controllers/CreateCategoryController';
import UpdateCategoryController from '../controllers/UpdateCategoryController';
import DeleteCategoryController from '../controllers/DeleteCategoryController';

const categoriesRoutes = Router();

const findCategoryByIDController = container.resolve(
	FindCategoryByIDController,
);

const findCategoryBySKUPrefixController = container.resolve(
	FindCategoryBySKUPrefixController,
);

const listCategoriesController = container.resolve(ListCategoriesController);

const createCategoryController = container.resolve(CreateCategoryController);

const updateCategoryController = container.resolve(UpdateCategoryController);

const deleteCategoryController = container.resolve(DeleteCategoryController);

categoriesRoutes.get('/find/by/id/:id', findCategoryByIDController.execute);
categoriesRoutes.get('/find/by/sku', findCategoryBySKUPrefixController.execute);
categoriesRoutes.get('/list', listCategoriesController.execute);
categoriesRoutes.post('/create', createCategoryController.execute);
categoriesRoutes.put('/update/:id', updateCategoryController.execute);
categoriesRoutes.delete('/delete/:id', deleteCategoryController.execute);

export default categoriesRoutes;
