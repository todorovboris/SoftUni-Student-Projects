import { Router } from 'express';

const homeController = Router();

homeController.get('/', (req, res) => {
    res.render('home', { pageTitle: 'Home' });
});

homeController.get('/search', (req, res) => {
    res.render('search', { pageTitle: 'Search' });
});

export default homeController;
