import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: 2,
        maxLength: 20,
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: 10,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: 4,
    },
});

const User = model('User', userSchema);

export default User;
