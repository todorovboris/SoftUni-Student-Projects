import { Schema, model } from 'mongoose';

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Name should be at least 5 characters long!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Name should includes alphanumeric, digits and whitespaces symbols only!'],
    },
    age: {
        type: Number,
        min: [1, 'Age should be at least 1 year old!'],
        max: 120,
    },
    born: {
        type: String,
        required: [true, 'Born is required!'],
        minLength: [10, 'Born should be at least 5 characters long!'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Born should includes alphanumeric, digits and whitespaces symbols only!'],
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Image URL should start with http:// or https://...'],
    },
});

const Cast = model('Cast', castSchema);

export default Cast;
