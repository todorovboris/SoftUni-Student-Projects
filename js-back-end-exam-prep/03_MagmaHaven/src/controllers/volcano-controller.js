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

volcanoController.get('/catalog', async (req, res) => {
    const volcanoes = await volcanoHandler.getAllVolcanoes();

    res.render('volcano/catalog', { volcanoes });
});

volcanoController.get('/:volcanoId/details', async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const volcano = await volcanoHandler.getOneVolcano(volcanoId);

    const isOwner = volcano.owner.equals(req.user?._id);
    const isVoted = volcano.voteList.includes(req.user?._id);

    res.render('volcano/details', { volcano, isOwner, isVoted });
});

export default volcanoController;
