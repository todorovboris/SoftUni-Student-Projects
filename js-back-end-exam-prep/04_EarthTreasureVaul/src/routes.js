import { Router } from 'express';
import homeController from './controllers/home-controller.js';
import authController from './controllers/auth-controller.js';
import stoneController from './controllers/stone-controller.js';

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/stones', stoneController);

routes.get('*', (req, res) => {
    res.render('404');
});

export default routes;
