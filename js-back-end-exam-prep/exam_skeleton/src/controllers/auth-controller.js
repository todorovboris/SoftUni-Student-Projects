import { Router } from 'express';
import authHandler from '../handlers/auth-handler.js';
import { AUTH_COOKIE_NAME } from '../config.js';
import { getErrorMessage } from '../utils/error-utils.js';

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        const token = await authHandler.register(userData);

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        return res.render('auth/register', { error: getErrorMessage(err), user: userData });
    }

    // res.redirect('/auth/login');
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authHandler.login(email, password);

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        return res.render('auth/login', { error: getErrorMessage(err), user: { email } });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});

export default authController;
