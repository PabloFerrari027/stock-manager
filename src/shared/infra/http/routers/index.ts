import categoriesRoutes from '@modules/categories/infra/http/routers/categories.routes';
import { Router } from 'express';

const appRouters = Router();

appRouters.use('/', categoriesRoutes);

export default appRouters;
