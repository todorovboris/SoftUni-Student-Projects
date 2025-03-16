import { Router } from 'express';
import stoneHandler from '../handlers/stone-handler.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const stones = await stoneHandler.getLatestStones();
    res.render('home', { stones, pageTitle: 'Home' });
});

export default homeController;
