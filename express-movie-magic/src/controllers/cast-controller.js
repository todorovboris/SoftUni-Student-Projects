import { Router } from 'express';
import castHandler from '../handlers/cast-handler.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { getErrorMessage } from '../utils/error-utils.js';

const castController = Router();

castController.use(isAuth);

castController.get('/create', (req, res) => {
    res.render('cast/create', { pageTitle: 'Create Cast' });
});

castController.post('/create', async (req, res) => {
    const newCast = req.body;

    try {
        await castHandler.createCast(newCast);
    } catch (err) {
        return res.render('cast/create', { error: getErrorMessage(err) });
    }

    res.redirect('/');
});

export default castController;
