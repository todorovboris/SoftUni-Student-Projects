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
    async createMovie(movieData) {
        const newMoviePromise = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
        });

        return newMoviePromise;
    },
    async attachCast(movieId, castId) {
        // Attach #1
        const movie = await Movie.findById(movieId);
        movie.casts.push(castId);
        await movie.save();

        return movie;
        // Attach #2
    },
};
