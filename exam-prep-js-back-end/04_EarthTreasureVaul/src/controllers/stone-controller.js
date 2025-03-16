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

stoneController.get('/:stoneId/details', async (req, res) => {
    const stoneId = req.params.stoneId;
    const stone = await stoneHandler.getOneStone(stoneId);

    const isOwner = stone.owner.equals(req.user?._id);
    const isLiked = stone.likedList.includes(req.user?._id);

    res.render('stones/details', { stone, isOwner, isLiked });
});

stoneController.get('/:stoneId/like', isAuth, async (req, res) => {
    const userId = req.user?._id;
    const stoneId = req.params.stoneId;
    const stone = await stoneHandler.getOneStone(stoneId);

    if (stone.owner.equals(userId)) {
        return res.render('404', { error: 'Cannot like your own stones!' });
    }

    if (stone.likedList.includes(userId)) {
        return res.render('404', { error: 'You already liked this stone!' });
    }

    try {
        await stoneHandler.likeStone(stoneId, userId);
        res.redirect(`/stones/${stoneId}/details`);
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});

stoneController.get('/:stoneId/delete', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId;
    const stone = await stoneHandler.getOneStone(stoneId);

    if (!stone.owner.equals(req.user?._id)) {
        return res.render('404', { error: 'You are not the stone owner!' });
    }

    try {
        await stoneHandler.deleteStone(stoneId);
        res.redirect('/stones/dashboard');
    } catch (err) {
        //
    }
});

stoneController.get('/:stoneId/edit', isAuth, async (req, res) => {
    const stoneId = req.params.stoneId;
    const stone = await stoneHandler.getOneStone(stoneId);

    if (!stone.owner.equals(req.user?._id)) {
        return res.render('404', { error: 'You are not the stone owner!' });
    }

    res.render('stones/edit', { stone });
});

stoneController.post('/:stoneId/edit', isAuth, async (req, res) => {
    const newData = req.body;
    const stoneId = req.params.stoneId;

    try {
        await stoneHandler.editStone(stoneId, newData);
        res.redirect(`/stones/${stoneId}/details`);
    } catch (err) {
        return res.render('stones/edit', { stone: newData, error: getErrorMessage(err) });
    }
});

export default stoneController;
