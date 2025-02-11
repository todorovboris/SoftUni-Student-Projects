import { Router } from 'express';
import deviceHandler from '../handlers/device-handler.js';
import { getErrorMessage } from '../utils/error-utils.js';
import { isAuth } from '../middlewares/auth-middleware.js';

const deviceController = Router();

deviceController.get('/create', (req, res) => {
    res.render('device/create', { pageTitle: 'Create Device' });
});

deviceController.post('/create', isAuth, async (req, res) => {
    const deviceData = req.body;
    const ownerId = req.user?._id;

    try {
        await deviceHandler.createDevice(deviceData, ownerId);
        res.redirect('/device');
    } catch (err) {
        return res.render('device/create', { device: deviceData, error: getErrorMessage(err) });
    }
});

export default deviceController;
