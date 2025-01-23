import { v4 as uuid } from 'uuid';
import movies from '../config/movies.js';
import Movie from '../models/Movie.js';

export default {
    getAllMovies(filter = {}) {
        let moviesQuery = Movie.find({});

        if (filter.search) {
            // TODO: fix partial case insensitive search
            moviesQuery = moviesQuery.where({ title: filter.search });
        }

        if (filter.genre) {
            // TODO: fix partial case insensitive search
            moviesQuery = moviesQuery.where({ genre: { $in: filter.genre } });
        }

        if (filter.year) {
            moviesQuery = moviesQuery.where({ year: Number(filter.year) });
        }

        return moviesQuery;
    },
    getOneMovie(movieId) {
        const movie = Movie.findById(movieId);

        return movie;
    },
    createMovie(movieData) {
        const newId = uuid();
        movies.push({
            id: newId,
            ...movieData,
            rating: Number(movieData.rating),
        });

        return newId;
    },
};
