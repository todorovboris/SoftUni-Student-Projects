import { Schema, model, Types } from 'mongoose';

const stoneSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required!'],
            minLength: [2, 'Name should be at least 2 characters long'],
        },
        category: {
            type: String,
            required: [true, 'Category is required!'],
            minLength: [3, 'Category should be at least 3 characters long'],
        },
        color: {
            type: String,
            required: [true, 'Color is required!'],
            minLength: [2, 'Color should be at least 2 characters long'],
        },
        image: {
            type: String,
            required: [true, 'Image is required!'],
            match: [/^https?:\/\//, 'Image URL should start with http:// or https://...'],
        },
        location: {
            type: String,
            required: [true, 'Location is required!'],
            minLength: [5, 'Location should be at least 5 characters long'],
            maxLength: [15, 'Location should be at maximum 15 characters long'],
        },
        formula: {
            type: String,
            required: [true, 'Formula is required!'],
            minLength: [3, 'Formula should be at least 3 characters long'],
            maxLength: [30, 'Formula should be at maximum 30 characters long'],
        },
        description: {
            type: String,
            required: [true, 'Description is required!'],
            minLength: [10, 'Description should be at least 10 characters long'],
        },
        likedList: [
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

const Stone = model('Stone', stoneSchema);
export default Stone;
