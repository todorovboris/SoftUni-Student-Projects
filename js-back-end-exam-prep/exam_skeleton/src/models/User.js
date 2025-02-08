import { Schema, model } from 'mongoose';

// TODO: Modify according the project instructions
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
});

const User = model('User', userSchema);

export default User;
