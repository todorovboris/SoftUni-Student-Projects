import User from '../Models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/auth-utils.js';

export default {
    async register(userData) {
        if (userData.password !== userData.rePassword) {
            throw new Error('Password do not match!');
        }

        const user = await User.findOne({ email: userData.email }).select({ _id: true });
        if (user) {
            throw new Error('Email already exists!');
        }

        const createdUser = await User.create({ ...userData });

        // return createdUser
        const token = generateToken(createdUser);
        return token;
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password!');
        }

        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            throw new Error('Invalid email or password!');
        }

        const token = generateToken(user);
        return token;
    },
};
