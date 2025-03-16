import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

// TODO: Modify according the project instructions
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        minLength: [10, 'Email should be at least 10 characters long'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be at least 4 characters long'],
    },
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;
