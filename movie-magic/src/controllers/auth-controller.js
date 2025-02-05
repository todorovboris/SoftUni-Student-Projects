import { Router } from 'express';
import authHandler from '../handlers/auth-handler.js';
import cookieParser from 'cookie-parser';

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authHandler.register(userData);
    } catch (err) {
        console.log(err.message);
        return res.redirect('/404');
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
    } catch (err) {
        console.log(err.message);
        return res.redirect('/404');
    }

    res.redirect('/');
});

export default authController;
