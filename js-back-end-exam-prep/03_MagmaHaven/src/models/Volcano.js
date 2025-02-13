import { Schema, model, Types } from 'mongoose';

const volcanoSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required!'],
        },
        location: {
            type: String,
            required: [true, 'Location is required!'],
        },
        elevation: {
            type: Number,
            required: [true, 'Elevation is required!'],
        },
        lastEruption: {
            type: Number,
            required: [true, 'Last eruption is required!'],
        },
        image: {
            type: String,
            required: [true, 'Image is required!'],
        },
        typeVolcano: {
            type: String,
            required: [true, 'Type is required!'],
            enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
        },
        description: {
            type: String,
            required: [true, 'Description is required!'],
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
