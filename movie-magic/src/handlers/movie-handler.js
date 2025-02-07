import Movie from '../models/Movie.js';

export default {
    getAllMovies(filter = {}) {
        let moviesQuery = Movie.find({});

        if (filter.search) {
            moviesQuery = moviesQuery.where({ title: { $regex: filter.search, $options: 'i' } });
        }

        if (filter.genre) {
            moviesQuery = moviesQuery.where({ genre: { $regex: filter.genre, $options: 'i' } });
        }

        if (filter.year) {
            moviesQuery = moviesQuery.where({ year: Number(filter.year) });
        }

        return moviesQuery;
    },
    getOneMovie(movieId) {
        const movie = Movie.findById(movieId).populate('casts'); // ppopulate is function for invoking the information for related cats of each movie
        return movie;
    },
    async createMovie(movieData, creatorId) {
        const newMoviePromise = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,
        });

        return newMoviePromise;
    },
    async attachCast(movieId, castId) {
        // *Attach #1
        // const movie = await Movie.findById(movieId);
        // movie.casts.push(castId);
        // await movie.save();
        // return movie;

        // *Attach #2
        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } }); //*mongoDb
    },
    delete(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },
    update(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData, { runValidators: true });
        // return Movie.findByIdAndUpdate(movieId, movieData);
    },
};
