import { Router } from 'express';
import castHandler from '../handlers/cast-handler.js';

const castController = Router();

castController.get('/create', (req, res) => {
    res.render('cast/create');
});

castController.post('/create', async (req, res) => {
    const newCast = req.body;
    await castHandler.createCast(newCast);

    res.redirect('/');
});

export default castController;
