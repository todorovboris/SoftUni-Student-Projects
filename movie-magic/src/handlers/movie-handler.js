import movies from '../config/movies.js';

export function getMovie(movieId) {
    // TODO: if movie is missing

    const movie = movies.find((movie) => movie.id == movieId);

    return movie;
}
