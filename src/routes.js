import { Router } from 'express';

import CaixaController from './app/controllers/CaixaController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MovesController from './app/controllers/MovesController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/caixa', CaixaController.update);
routes.get('/caixa', CaixaController.index);

routes.put('/users', UserController.update);

routes.get('/moves', MovesController.index);

export default routes;
