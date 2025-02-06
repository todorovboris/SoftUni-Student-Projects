import { Router } from 'express';
import castHandler from '../handlers/cast-handler.js';
import { isAuth } from '../middlewares/auth-middleware.js';

const castController = Router();

castController.get('/create', isAuth, (req, res) => {
    res.render('cast/create', { pageTitle: 'Create Cast' });
});

castController.post('/create', async (req, res) => {
    const newCast = req.body;
    await castHandler.createCast(newCast);

    res.redirect('/');
});

export default castController;
