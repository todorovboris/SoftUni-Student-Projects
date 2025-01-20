import { v4 as uuid } from 'uuid';
import movies from '../config/movies.js';

export default {
    getAllMovies(filter = {}) {
        let result = movies;

        if (filter.search) {
            result = result.filter((movie) => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        }

        return result;
    },
    getOneMovie(movieId) {
        const movie = movies.find((movie) => movie.id == movieId);

        if (!movie) {
            return { title: 'No Movie Found!' };
        }

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
