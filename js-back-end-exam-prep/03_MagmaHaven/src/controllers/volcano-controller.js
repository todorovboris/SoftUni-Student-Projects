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

volcanoController.get('/:volcanoId/vote', isAuth, async (req, res) => {
    const userId = req.user?._id;
    const volcanoId = req.params.volcanoId;
    const volcano = await volcanoHandler.getOneVolcano(volcanoId);

    if (volcano.owner.equals(userId)) {
        return res.render('404', { error: 'Cannot vote for your own volcano!' });
    }

    if (volcano.voteList.includes(userId)) {
        return res.render('404', { error: 'You already voted for this volcano!' });
    }

    try {
        await volcanoHandler.voteVolcatno(volcanoId, userId);
        res.redirect(`/volcano/${volcanoId}/details`);
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});

volcanoController.get('/:volcanoId/delete', isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const volcano = await volcanoHandler.getOneVolcano(volcanoId);

    if (!volcano.owner.equals(req.user?._id)) {
        return res.render('404', { error: 'You are not the volcano owner!' });
    }

    try {
        await volcanoHandler.deleteVolcano(volcanoId);
        res.redirect('/volcano/catalog');
    } catch (err) {
        return res.render('404', { error: getErrorMessage(err) });
    }
});

export default volcanoController;
