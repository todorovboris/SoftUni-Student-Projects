import { html, render } from 'https://unpkg.com/lit-html';
import auth from '../service/auth.js';
import page from '//unpkg.com/page/page.mjs';

const mainSection = document.querySelector('body main');

const template = () => html`
    <section id="login-section">
        <h2>Login</h2>
        <form @submit=${loginFormSubmit}>
            <label>E-mail: <input type="text" name="email" /></label>
            <label>Password: <input type="password" name="password" /></label>
            <input type="submit" value="Login" />
        </form>
    </section>
`;

export default function loginPage() {
    render(template(), mainSection);
}

async function loginFormSubmit(e) {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    try {
        const loginResult = await auth.login(email, password);
        if (loginResult) {
            page.redirect('/');
        }
    } catch (err) {
        alert(err.message);
    }
}
