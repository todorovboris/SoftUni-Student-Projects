import { Schema, model, Types } from 'mongoose';

const stoneSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required!'],
        },
        category: {
            type: String,
            required: [true, 'Category is required!'],
        },
        color: {
            type: String,
            required: [true, 'Color is required!'],
        },
        image: {
            type: String,
            required: [true, 'Image is required!'],
        },
        location: {
            type: String,
            required: [true, 'Location is required!'],
        },
        formula: {
            type: String,
            required: [true, 'Formula is required!'],
        },
        description: {
            type: String,
            required: [true, 'Description is required!'],
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
