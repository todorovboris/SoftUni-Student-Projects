import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        match: /\@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/,
        minLength: 10,
    },
    password: {
        type: String,
        minLength: 6,
        match: /^[a-zA-Z0-9]+$/,
    },
});

userSchema.pre('save', async function () {
    // TODO: fix update user big
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;
