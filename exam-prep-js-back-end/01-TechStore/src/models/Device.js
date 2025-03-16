import { Schema, model, Types } from 'mongoose';

const deviceSchema = new Schema(
    {
        brand: {
            type: String,
            required: [true, 'Brand is required!'],
            minLength: 2,
        },
        model: {
            type: String,
            required: [true, 'Model is required!'],
            minLength: 5,
        },
        hardDisc: {
            type: String,
            required: [true, 'Hard Disc is required!'],
            minLength: 5,
        },
        screenSize: {
            type: String,
            required: [true, 'Screen Size is required!'],
            minLength: 1,
        },
        ram: {
            type: String,
            required: [true, 'RAM is required!'],
            minLength: 2,
        },
        operatingSystem: {
            type: String,
            required: [true, 'Operating System is required!'],
            minLength: 5,
            maxLength: 20,
        },
        cpu: {
            type: String,
            required: [true, 'CPU is required!'],
            minLength: 10,
            maxLength: 50,
        },
        gpu: {
            type: String,
            required: [true, 'GPU is required!'],
            minLength: 10,
            maxLength: 50,
        },
        price: {
            type: Number,
            required: [true, 'Price is required!'],
            min: 1,
        },
        color: {
            type: String,
            required: [true, 'Color is required!'],
            minLength: 2,
            maxLength: 10,
        },
        weight: {
            type: String,
            required: [true, 'Weight is required!'],
            minLength: 1,
        },
        image: {
            type: String,
            required: [true, 'Image is required!'],
            match: [/^https?:\/\//, 'Image URL should start with http:// or https://...'],
        },
        preferredList: [
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

const Device = model('Device', deviceSchema);

export default Device;
