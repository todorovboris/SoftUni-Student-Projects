import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /\@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/,
        minLength: 10,
        lowercase: true, // Sanitizer
    },
    password: {
        type: String,
        minLength: [6, 'Password should be at least 6 charecters!'],
        match: /^[a-zA-Z0-9]+$/,
        trim: true, // Sanitizer
    },
});

//! Validation if password and rePassword match on Model level - set virtual property:
userSchema.virtual('rePassword').set(function (rePass) {
    if (rePass !== this.password) {
        throw new Error('Password do not match!');
    }
});

userSchema.pre('save', async function () {
    // TODO: fix update user big
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;
