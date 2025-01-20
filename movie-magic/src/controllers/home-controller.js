import { Router } from 'express';
import movieHandler from '../handlers/movie-handler.js';

const router = Router();
const movies = movieHandler.getAllMovies();

router.get('/', (req, res) => {
    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

export default router;
