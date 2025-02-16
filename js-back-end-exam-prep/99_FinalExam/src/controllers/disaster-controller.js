import { Router } from 'express';
import { isAuth } from '../middlewares/auth-middleware.js';
import disasterHandler from '../handlers/disaster-handler.js';
import { getErrorMessage } from '../utils/error-utils.js';
import getDisasterTypesData from '../helpers/getTypesData.js';

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

disasterController.get('/:disasterId/details', async (req, res) => {
    const disasterId = req.params.disasterId;
    const disaster = await disasterHandler.getOneDisaster(disasterId);

    const isOwner = disaster.owner.equals(req.user?._id);
    const isInterested = disaster.interestedList.includes(req.user?._id);

    res.render('disasters/details', { disaster, isOwner, isInterested });
});

disasterController.get('/:disasterId/interest', isAuth, async (req, res) => {
    const disasterId = req.params.disasterId;
    const disaster = await disasterHandler.getOneDisaster(disasterId);
    const userId = req.user?._id;

    if (disaster.owner.equals(userId)) {
        return res.render('404', { error: 'Cannot be interested for your own disaster!' });
    }

    if (disaster.interestedList.includes(userId)) {
        return res.render('404', { error: 'You are alerady interested for this disaster!' });
    }

    try {
        await disasterHandler.interestDisaster(disasterId, userId);
        res.redirect(`/disasters/${disasterId}/details`);
    } catch (err) {
        res.render('404', { error: getErrorMessage(err) });
    }
});

disasterController.get('/:disasterId/delete', isAuth, async (req, res) => {
    const disasterId = req.params.disasterId;
    const disaster = await disasterHandler.getOneDisaster(disasterId);

    if (!disaster.owner.equals(req.user?._id)) {
        return res.render('404', { error: 'You dont have permission for deleting!' });
    }

    try {
        await disasterHandler.deleteDisaster(disasterId);
        res.redirect('/disasters/catalog');
    } catch (err) {
        return res.render('404', { error: getErrorMessage(err) });
    }
});

disasterController.get('/:disasterId/edit', isAuth, async (req, res) => {
    const disasterId = req.params.disasterId;
    const disaster = await disasterHandler.getOneDisaster(disasterId);

    if (!disaster.owner.equals(req.user?._id)) {
        return res.render('404', { error: 'You dont have permission for editing!' });
    }

    const types = getDisasterTypesData(disaster.type);

    res.render('disasters/edit', { disaster, types });
});

disasterController.post('/:disasterId/edit', isAuth, async (req, res) => {
    const newData = req.body;
    const disasterId = req.params.disasterId;

    try {
        await disasterHandler.editDisaster(disasterId, newData);
        res.redirect(`/disasters/${disasterId}/details`);
    } catch (err) {
        const types = getDisasterTypesData(newData.type);
        res.render('disasters/edit', { disaster: newData, types, error: getErrorMessage(err) });
    }
});

export default disasterController;
