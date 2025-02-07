import { Schema, model, Types } from 'mongoose';

// !Create Schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'], //! default value is FALSE
        minLength: [5, 'Title should be at least 5 characters long!'],
        maxLength: 100,
        match: [/^[a-zA-Z0-9 ]+$/, 'Title should includes alphanumeric, digits and whitespaces symbols only!'],
    },
    category: {
        type: String,
        required: true,
        enum: ['tv-show', 'animation', 'movie', 'documentary', 'short-film'], //! enum => should be one from the presented values
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [5, 'Genre should be at least 5 characters long!'],
        maxLength: 100,
        match: [/^[a-zA-Z0-9 ]+$/, 'Genre should includes alphanumeric, digits and whitespaces symbols only!'],
    },
    director: {
        type: String,
        minLength: [5, 'Director should be at least 5 characters long!'],
        maxLength: 100,
        match: [/^[a-zA-Z0-9 ]+$/, 'Director should includes alphanumeric, digits and whitespaces symbols only!'],
    },
    year: {
        type: Number,
        min: 1900,
        max: 2025,
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Image URL should start with http:// or https://...'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    description: {
        type: String,
        minLength: [20, 'Description should be at least 20 characters long!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Description should includes alphanumeric, digits and whitespaces symbols only!'],
    },
    casts: [
        {
            type: Types.ObjectId,
            ref: 'Cast',
        },
    ],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    },
});

// !Create Model
const Movie = model('Movie', movieSchema);

// !Export Model
export default Movie;
