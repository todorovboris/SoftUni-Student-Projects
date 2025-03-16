import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../api/auth.js';
import page from '../../node_modules/page/page.mjs';

export default async function logoutView(ctx) {
    try {
        await logout();
        page.redirect('/');
    } catch (err) {
        return alert(err.message);
    }
}
