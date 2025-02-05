import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default {
    async register(userData) {
        //! if hash the password in the handler
        // const { email, password } = userData;
        // const salt = await bcrypt.genSalt(10);
        // const hashEmail = await bcrypt.hash(email, salt);
        // const hashPass = await bcrypt.hash(password, salt);

        return User.create({ ...userData });
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        //* check if user exists
        if (!user) {
            throw new Error('Invalid email or password!');
        }

        //* check if password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid email or password!');
        }

        //* generate token
        const payload = {
            _id: user._id,
            email: user.email,
        };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '2h' });

        //* return token
        return token;
    },
};
