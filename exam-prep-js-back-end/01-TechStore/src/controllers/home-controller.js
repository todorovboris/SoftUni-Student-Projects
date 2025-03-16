import { Router } from 'express';
import deviceHandler from '../handlers/device-handler.js';
import { isAuth } from '../middlewares/auth-middleware.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const latestDevices = await deviceHandler.getLatest();

    res.render('home', { latestDevices, pageTitle: 'Home' });
});

homeController.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About' });
});

homeController.get('/profile', isAuth, async (req, res) => {
    const filter = req.user?._id;
    const ownDevices = await deviceHandler.getAllDevices({ owner: filter });
    const prefDevices = await deviceHandler.getAllDevices({ preferred: filter });

    res.render('profile', {
        ownDevices,
        prefDevices,
        pageTitle: 'Profile',
    });
});

export default homeController;
