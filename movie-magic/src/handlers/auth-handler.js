import bcrypt from 'bcrypt';

import User from '../models/User.js';

export default {
    async register(userData) {
        //! if hash the password in the handler
        // const { email, password } = userData;
        // const salt = await bcrypt.genSalt(10);
        // const hashEmail = await bcrypt.hash(email, salt);
        // const hashPass = await bcrypt.hash(password, salt);

        return User.create({ ...userData });
    },
};
