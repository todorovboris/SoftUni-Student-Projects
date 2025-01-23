import { v4 as uuid } from 'uuid';
import movies from '../config/movies.js';
import Movie from '../models/Movie.js';

export default {
    getAllMovies(filter = {}) {
        let allMovies = Movie.find({});

        // if (filter.search) {
        //     result = result.filter((movie) => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        // }

        // if (filter.genre) {
        //     result = result.filter((movie) => movie.genre.toLowerCase().includes(filter.genre.toLowerCase()));
        // }

        // if (filter.year) {
        //     result = result.filter((movie) => movie.year === filter.year);
        // }

        return allMovies;
    },
    getOneMovie(movieId) {
        // const movie = movies.find((movie) => movie.id == movieId);
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
