import { Schema, model, Types } from 'mongoose';

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required!'],
            minLength: [2, 'Title should be at least 2 characters long!'],
        },
        description: {
            type: String,
            required: [true, 'Description is required!'],
            minLength: [10, 'Description should be at least 10 characters long!'],
            maxLength: [100, 'Description should be maximum 100 characters long!'],
        },
        ingredients: {
            type: String,
            required: [true, 'Ingredients is required!'],
            minLength: [10, 'Ingredients should be at least 10 characters long!'],
            maxLength: [200, 'Ingredients should be maximum 200 characters long!'],
        },
        instructions: {
            type: String,
            required: [true, 'Instructions is required!'],
            minLength: [10, 'Instructions should be at least 2 characters long!'],
        },
        image: {
            type: String,
            required: [true, 'Image is required!'],
            match: [/^https?:\/\//, 'Image URL should start with http:// or https://...'],
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
    },
    {
        timestamps: true,
    }
);

const Recipe = model('Recipe', recipeSchema);

export default Recipe;
