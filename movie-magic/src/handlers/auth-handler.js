import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default {
    async register(userData) {
        //* Validation if email exists
        const userCount = await User.countDocuments({ email: userData.email });
        if (userCount > 0) {
            throw new Error('Email already exists!');
        }

        //* Validation if password and repeat-password match - check in Model User for other solution!
        // if (userData.password !== userData.rePassword) {
        //     throw new Error('Passowrd do not match!');
        // }

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
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

        //* return token
        return token;
    },
};
