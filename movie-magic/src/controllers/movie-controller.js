import { Router } from 'express';
import movieHandler from '../handlers/movie-handler.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const newMovie = req.body;
    movieHandler.createMovie(newMovie);

    res.redirect('/');
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieHandler.getOneMovie(movieId);

    res.render('details', { movie });
});

export default movieController;
