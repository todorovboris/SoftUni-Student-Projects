import { Schema, model, Types } from 'mongoose';

const volcanoSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required!'],
            minLength: [2, 'Name should be at least 2 characters long!'],
        },
        location: {
            type: String,
            required: [true, 'Location is required!'],
            minLength: [3, 'Location should be at least 3 characters long!'],
        },
        elevation: {
            type: Number,
            required: [true, 'Elevation is required!'],
            min: [0, 'Elevation should be minimum 0!'],
        },
        lastEruption: {
            type: Number,
            required: [true, 'Last eruption is required!'],
            min: [0, 'The Year of Last Eruption should be between 0 and 2024!'],
            max: [2024, 'The Year of Last Eruption should be between 0 and 2024!'],
        },
        image: {
            type: String,
            required: [true, 'Image is required!'],
            match: [/^https?:\/\//, 'Image URL should start with http:// or https://...'],
        },
        typeVolcano: {
            type: String,
            required: [true, 'Type is required!'],
            enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
        },
        description: {
            type: String,
            required: [true, 'Description is required!'],
            minLength: [10, 'Username should be at least 10 characters long!'],
        },
        voteList: [
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

const Volcano = model('Volcano', volcanoSchema);
export default Volcano;
