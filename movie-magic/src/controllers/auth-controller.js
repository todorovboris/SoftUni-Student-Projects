import { Router } from 'express';
import authHandler from '../handlers/auth-handler.js';

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    await authHandler.register(userData);

    res.redirect('/auth/login');
});

export default authController;
