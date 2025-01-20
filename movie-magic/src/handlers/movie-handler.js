import { v4 as uuid } from 'uuid';
import movies from '../config/movies.js';

export default {
    getOneMovie(movieId) {
        // TODO: if movie is missing
        const movie = movies.find((movie) => movie.id == movieId);

        return movie;
    },
    createMovie(movieData) {
        const newId = uuid();
        movies.push({
            id: newId,
            ...movieData,
        });

        return newId;
    },
};
// export function getMovie(movieId) {
//     // TODO: if movie is missing

//     const movie = movies.find((movie) => Number(movie.id) === Number(movieId));

//     return movie;
// }
