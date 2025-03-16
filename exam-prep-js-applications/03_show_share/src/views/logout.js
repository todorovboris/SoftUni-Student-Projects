import { logout } from '../api/auth.js';
import page from 'page/page.mjs';

export default async function logoutView(ctx) {
    const token = localStorage.getItem('accessToken');

    if (token) {
        try {
            await logout(token);
            page.redirect('/');
        } catch (err) {
            console.error(err.message);
        }
    }
}
