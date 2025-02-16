import { Schema, model, Types } from 'mongoose';

const disasterSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required!'],
        },
        type: {
            type: String,
            required: [true, 'Type is required!'],
            enum: ['Wildfire', 'Flood', 'Earthquake', 'Hurricane', 'Drought', 'Tsunami', 'Other'],
        },
        year: {
            type: Number,
            required: [true, 'Year is required!'],
        },
        location: {
            type: String,
            required: [true, 'Location is required!'],
        },
        image: {
            type: String,
            required: [true, 'Image is required!'],
        },
        description: {
            type: String,
            required: [true, 'Description is required!'],
        },
        interestedList: [
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

const Disaster = model('Disaster', disasterSchema);
export default Disaster;
