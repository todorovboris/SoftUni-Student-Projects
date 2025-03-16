import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const generateToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        name: user.name,
    };
    const secretKey = JWT_SECRET;
    const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });

    return token;
};
