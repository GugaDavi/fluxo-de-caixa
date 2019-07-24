import { Router } from 'express';

import CaixaController from './app/controllers/CaixaController';

const routes = new Router();

routes.post('/caixa', CaixaController.store);

export default routes;
