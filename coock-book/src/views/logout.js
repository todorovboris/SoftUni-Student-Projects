import page from '//unpkg.com/page/page.mjs';
import auth from '../service/auth.js';

export default function logoutPage() {
    const token = localStorage.getItem('accessToken');

    auth.logout(token);
    // page.redirect('/catalog');
    location.href = '/';
}
