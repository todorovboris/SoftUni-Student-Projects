import { Router } from 'express';
import movieHandler from '../handlers/movie-handler.js';
import castHandler from '../handlers/cast-handler.js';
import getCategoriesViewData from '../helpers/categoriesViewData.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const movieData = req.body; // create object with the data from THE FORM of the POST REQUEST
    const creatorId = req.user?._id;
    await movieHandler.createMovie(movieData, creatorId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId; // take the query parameters
    const movie = await movieHandler.getOneMovie(movieId);
    const isCreator = movie.creator.equals(req.user?._id);

    res.render('movie/details', { movie, isCreator });
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieHandler.getAllMovies(filter);

    res.render('search', { movies, filter });
});

movieController.get('/:movieId/cast-attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieHandler.getOneMovie(movieId);
    const casts = await castHandler.getAllCasts({ exclude: movie.casts });

    res.render('movie/cast-attach', { movie, casts });
});

movieController.post('/:movieId/cast-attach', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieHandler.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieHandler.getOneMovie(movieId);
    if (!movie.creator.equals(req.user?._id)) {
        return res.redirect('404');
    }

    await movieHandler.delete(movieId);
    res.redirect('/');
});

movieController.get('/:movieId/edit', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieHandler.getOneMovie(movieId);

    const categories = getCategoriesViewData(movie.category);

    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', async (req, res) => {
    const movieData = req.body;
    const movieID = req.params.movieId;
    const creatorId = req.user?._id;

    await movieHandler.update(movieID, movieData);

    res.redirect(`/movies/${movieID}/details`);
});

export default movieController;
