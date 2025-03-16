import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    //* Get token
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    //* Validate token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        //* Attach decoded token to request
        req.user = decodedToken;
        res.locals.user = decodedToken;

        next();
    } catch (err) {
        // TODO: Invalid token
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};

//! Route Guard
export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/404');
    }

    next();
};
