import { Router } from 'express';
import movies from '../config/movies.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/search', (req, res) => {
    res.render('search', { movies });
});

export default movieController;
