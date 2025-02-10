import User from '../Models/User.js';

export default {
    async register(userData) {
        if (userData.password !== userData.rePassword) {
            throw new Error('Password do not match!');
        }

        const user = await User.findOne({ email: userData.email }).select({ _id: true });
        if (user) {
            throw new Error('Email already exists!');
        }

        return User.create({ ...userData });
    },
};
