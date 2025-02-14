import { Router } from 'express';
import { isAuth } from '../middlewares/auth-middleware.js';
import stoneHandler from '../handlers/stone-handler.js';
import { getErrorMessage } from '../utils/error-utils.js';

const stoneController = Router();

stoneController.get('/create', isAuth, (req, res) => {
    res.render('stones/create');
});

stoneController.post('/create', isAuth, async (req, res) => {
    const stoneData = req.body;
    const userId = req.user?._id;

    try {
        await stoneHandler.createStone(stoneData, userId);
        res.redirect('/stones/dashboard');
    } catch (err) {
        return res.render('stones/create', { stone: stoneData, error: getErrorMessage(err) });
    }
});

stoneController.get('/dashboard', async (req, res) => {
    const stones = await stoneHandler.getAllStones();
    res.render('stones/dashboard', { stones });
});

export default stoneController;
