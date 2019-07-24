import { Router } from 'express';

import CaixaController from './app/controllers/CaixaController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/caixa', CaixaController.store);
routes.put('/users', UserController.update);

export default routes;
