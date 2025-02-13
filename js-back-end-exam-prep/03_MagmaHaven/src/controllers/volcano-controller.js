import { Router } from 'express';
import { isAuth } from '../middlewares/auth-middleware.js';
import volcanoHandler from '../handlers/volcano-handler.js';
import { getErrorMessage } from '../utils/error-utils.js';

const volcanoController = Router();

volcanoController.get('/create', isAuth, (req, res) => {
    res.render('volcano/create');
});

volcanoController.post('/create', isAuth, async (req, res) => {
    const volcanoData = req.body;
    const ownerId = req.user?._id;

    try {
        await volcanoHandler.createVolcano(volcanoData, ownerId);
        res.redirect('/volcano/catalog');
    } catch (err) {
        return res.render('volcano/create', { volcano: volcanoData, error: getErrorMessage(err) });
    }
});

export default volcanoController;
