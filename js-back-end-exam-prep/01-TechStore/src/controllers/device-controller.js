import { Router } from 'express';
import deviceHandler from '../handlers/device-handler.js';
import { getErrorMessage } from '../utils/error-utils.js';
import { isAuth } from '../middlewares/auth-middleware.js';

const deviceController = Router();

deviceController.get('/catalog', async (req, res) => {
    const devices = await deviceHandler.getAllDevices();

    res.render('device/catalog', { devices, pageTitle: 'Catalog' });
});

deviceController.get('/create', isAuth, (req, res) => {
    res.render('device/create', { pageTitle: 'Create Device' });
});

deviceController.post('/create', isAuth, async (req, res) => {
    const deviceData = req.body;
    const ownerId = req.user?._id;

    try {
        await deviceHandler.createDevice(deviceData, ownerId);
        res.redirect('/device/catalog');
    } catch (err) {
        return res.render('device/create', { device: deviceData, error: getErrorMessage(err) });
    }
});

deviceController.get('/:deviceId/details', async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceHandler.getOneDevice(deviceId);

    const isOwner = device.owner.equals(req.user?._id);
    const isPrefered = device.preferredList.includes(req.user?._id);

    res.render('device/details', { device, isOwner, isPrefered, pageTitle: `${device.brand} ${device.model} - Details` });
});

deviceController.get('/:deviceId/prefer', isAuth, async (req, res) => {
    const userId = req.user?._id;
    const deviceId = req.params.deviceId;

    try {
        await deviceHandler.preferDevice(deviceId, userId);
        res.redirect(`/device/${deviceId}/details`);
    } catch (err) {
        return res.render('404', { error: err.message });
    }
});

deviceController.get('/:deviceId/delete', isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceHandler.getOneDevice(deviceId);

    if (!device.owner.equals(req.user?._id)) {
        return res.render('404', { device, error: 'You are not the device owner!' });
    }

    try {
        await deviceHandler.delete(deviceId);
        res.redirect('device/catalog');
    } catch (err) {
        return res.render('404', { error: getErrorMessage(err) });
    }
});

deviceController.get('/:deviceId/edit', isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await deviceHandler.getOneDevice(deviceId);
    const isPrefered = device.preferredList.includes(req.user?._id);

    if (!device.owner.equals(req.user?._id)) {
        // return res.render(`device/details`, { device, isPrefered, error: 'You are not the device owner!' });
        return res.render(`404`, { device, error: 'You are not the device owner!' });
    }

    res.render('device/edit', { device });
});

deviceController.post('/:deviceId/edit', isAuth, async (req, res) => {
    const deviceData = req.body;
    const deviceId = req.params.deviceId;

    try {
        await deviceHandler.updateDevice(deviceId, deviceData);
        res.redirect(`/device/${deviceId}/details`);
    } catch (err) {
        return res.render('device/edit', { device: deviceData, error: getErrorMessage(err) });
    }
});

export default deviceController;
