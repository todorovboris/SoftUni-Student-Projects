import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { logout } from '../api/auth.js';

export default async function logoutView(ctx) {
    try {
        await logout();
        page.redirect('/');
    } catch (err) {
        return alert(err.message);
    }
}
