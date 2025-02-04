import User from '../models/User.js';

export default {
    async register(userData) {
        const newRegistration = User.create({ ...userData });

        return newRegistration;
    },
};
