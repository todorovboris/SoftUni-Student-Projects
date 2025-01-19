import movies from '../config/movies.js';

export default {
    getOneMovie(movieId) {
        // TODO: if movie is missing

        const movie = movies.find((movie) => Number(movie.id) === Number(movieId));

        return movie;
    },
};
// export function getMovie(movieId) {
//     // TODO: if movie is missing

//     const movie = movies.find((movie) => Number(movie.id) === Number(movieId));

//     return movie;
// }
