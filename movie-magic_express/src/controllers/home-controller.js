import { Router } from 'express';
import movieHandler from '../handlers/movie-handler.js';

const router = Router();

router.get('/', async (req, res) => {
    const movies = await movieHandler.getAllMovies();

    res.render('home', { movies, pageTitle: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About' });
});

export default router;
