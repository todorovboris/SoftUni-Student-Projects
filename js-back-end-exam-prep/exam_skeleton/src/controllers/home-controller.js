import { Router } from 'express';

const homeController = Router();

homeController.get('/', (req, res) => {
    res.send('Works!');
});

export default homeController;
