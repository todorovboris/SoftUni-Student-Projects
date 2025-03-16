import { Schema, model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

// TODO: Modify according the project instructions
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
        minLength: 10,
    },
    // ownDevices: [
    //     {
    //         type: Types.ObjectId,
    //         ref: 'Device',
    //     },
    // ],
    // prefDevices: [
    //     {
    //         type: Types.ObjectId,
    //         ref: 'Device',
    //     },
    // ],
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;
