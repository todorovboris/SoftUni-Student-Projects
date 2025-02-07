import { Router } from 'express';
import authHandler from '../handlers/auth-handler.js';
import cookieParser from 'cookie-parser';
import { getErrorMessage } from '../utils/error-utils.js';

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authHandler.register(userData);
    } catch (err) {
        const currentError = getErrorMessage(err);
        return res.render('auth/register', { error: currentError });
    }

    res.redirect('/auth/login');
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authHandler.login(email, password);

        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        return res.render('auth/login', { error: getErrorMessage(err) });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

export default authController;
