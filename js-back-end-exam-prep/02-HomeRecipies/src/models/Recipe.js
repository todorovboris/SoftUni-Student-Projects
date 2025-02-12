import { Schema, model, Types } from 'mongoose';

const recipeSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients is required!'],
    },
    instructions: {
        type: String,
        required: [true, 'Instructions is required!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
    },
    recommendList: [
        {
            type: Types.ObjectId,
            ref: 'User',
        },
    ],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;
