import { Router } from 'express';
import authHandler from '../handlers/auth-handler.js';

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
        return res.render('auth/register');
    }

    res.redirect('/');
});

export default authController;
