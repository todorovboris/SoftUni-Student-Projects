import { Router } from 'express';
import { isAuth } from '../middlewares/auth-middleware.js';
import disasterHandler from '../handlers/disaster-handler.js';
import { getErrorMessage } from '../utils/error-utils.js';

const disasterController = Router();

disasterController.get('/create', isAuth, (req, res) => {
    res.render('disasters/create', { pageTitle: 'Create Disaster' });
});

disasterController.post('/create', isAuth, async (req, res) => {
    const disasterData = req.body;
    const userId = req.user?._id;

    try {
        await disasterHandler.createDisaster(disasterData, userId);
        res.redirect('/disasters/catalog');
    } catch (err) {
        return res.render('disasters/create', { disaster: disasterData, error: getErrorMessage(err) });
    }
});

disasterController.get('/catalog', async (req, res) => {
    const disasters = await disasterHandler.getAllDisasters();
    res.render('disasters/catalog', { disasters });
});

export default disasterController;
