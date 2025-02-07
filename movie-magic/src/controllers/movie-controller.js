import { Router } from 'express';
import movieHandler from '../handlers/movie-handler.js';
import castHandler from '../handlers/cast-handler.js';
import getCategoriesViewData from '../helpers/categoriesViewData.js';
import { isAuth } from '../middlewares/auth-middleware.js';
import { getErrorMessage } from '../utils/error-utils.js';

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    res.render('create', { pageTitle: 'Create Movie' });
});

movieController.post('/create', async (req, res) => {
    const movieData = req.body; // create object with the data from THE FORM of the POST REQUEST
    const creatorId = req.user?._id;

    try {
        await movieHandler.createMovie(movieData, creatorId);
    } catch (err) {
        return res.render('create', { error: getErrorMessage(err) });
    }

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId; // take the query parameters
    const movie = await movieHandler.getOneMovie(movieId);
    const isCreator = movie.creator.equals(req.user?._id);

    res.render('movie/details', { movie, isCreator, pageTitle: movie.title });
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieHandler.getAllMovies(filter);

    res.render('search', { movies, filter, pageTitle: 'Search' });
});

movieController.get('/:movieId/cast-attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieHandler.getOneMovie(movieId);
    const casts = await castHandler.getAllCasts({ exclude: movie.casts });

    res.render('movie/cast-attach', { movie, casts });
});

movieController.post('/:movieId/cast-attach', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    try {
        await movieHandler.attachCast(movieId, castId);
    } catch (err) {
        return res.render('404', { error: 'Unable to attach!' });
    }

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieHandler.getOneMovie(movieId);
    if (!movie.creator.equals(req.user?._id)) {
        return res.redirect('404');
    }

    await movieHandler.delete(movieId);
    res.redirect('/');
});

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieHandler.getOneMovie(movieId);

    const categories = getCategoriesViewData(movie.category);

    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', async (req, res) => {
    const movieData = req.body;
    const movieID = req.params.movieId;

    try {
        await movieHandler.update(movieID, movieData);
    } catch (err) {
        const categories = getCategoriesViewData(movieData.category);

        return res.render('movie/edit', { movie: movieData, categories, error: getErrorMessage(err) });
    }

    res.redirect(`/movies/${movieID}/details`);
});

export default movieController;
