import { Router } from 'express';
import movieHandler from '../handlers/movie-handler.js';

const router = Router();

router.get('/', async (req, res) => {
    const movies = await movieHandler.getAllMovies();

    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

export default router;
