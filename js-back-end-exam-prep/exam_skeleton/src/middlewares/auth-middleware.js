import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME, JWT_SECRET } from '../config.js';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        res.locals.user = decodedToken;
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        return res.redirect('/auth/login');
    }

    next();
};
