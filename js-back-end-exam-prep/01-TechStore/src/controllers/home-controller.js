import { Router } from 'express';
import deviceHandler from '../handlers/device-handler.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const latestDevices = await deviceHandler.getLatest();

    res.render('home', { latestDevices, pageTitle: 'Home' });
});

homeController.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About' });
});

homeController.get('/profile', (req, res) => {
    res.render('profile', { pageTitle: 'Profile' });
});

export default homeController;
