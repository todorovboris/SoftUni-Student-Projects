import User from '../Models/User.js';

export default {
    async register(userData) {
        if (userData.password !== userData.rePassword) {
            throw new Error('Password do not match!');
        }

        const usersCount = await User.countDocuments({ email: userData.email });
        if (usersCount > 0) {
            throw new Error('Email already exists!');
        }

        return User.create({ ...userData });
    },
};
