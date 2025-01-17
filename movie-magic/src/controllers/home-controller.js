import { Router } from 'express';
import movies from '../config/movies.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/search', (req, res) => {
    res.render('search', { movies });
});

export default router;
