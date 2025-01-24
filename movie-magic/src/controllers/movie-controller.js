import { Router } from 'express';
import movieHandler from '../handlers/movie-handler.js';
import castHandler from '../handlers/cast-handler.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body; // create object with the data from THE FORM of the POST REQUEST
    await movieHandler.createMovie(newMovie);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId; // take the query parameters
    const movie = await movieHandler.getOneMovie(movieId);

    res.render('movie/details', { movie });
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieHandler.getAllMovies(filter);

    res.render('search', { movies, filter });
});

movieController.get('/:movieId/cast-attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieHandler.getOneMovie(movieId);
    const casts = await castHandler.getAllCasts();

    res.render('movie/cast-attach', { movie, casts });
});

export default movieController;
