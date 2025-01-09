import page from '//unpkg.com/page/page.mjs';
import { html, render } from 'https://unpkg.com/lit-html';
import auth from '../service/auth.js';

const mainSection = document.querySelector('body main');

const template = () => html`
    <section id="register-section">
        <h2>Register</h2>
        <form @submit=${registerFormSubmit}>
            <label>E-mail: <input type="text" name="email" /></label>
            <label>Password: <input type="password" name="password" /></label>
            <label>Repeat: <input type="password" name="rePass" /></label>
            <input type="submit" value="Register" />
        </form>
    </section>
`;

export default function registerPage() {
    render(template(), mainSection);
}

async function registerFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const registerResult = await auth.register(email, password);
        if (registerResult) {
            page.redirect('/');
        }
    } catch (err) {
        alert(err.message);
    }
}
