import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { login } from '../api/auth.js';

const template = (onSubmit) => html` <!-- Login Page (Only for Guest users) -->
    <section id="login">
        <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
                <input type="text" name="email" id="email" placeholder="email" />
                <input type="password" name="password" id="password" placeholder="password" />
                <button type="submit">login</button>
                <p class="message">Not registered? <a href="/register">Create an account</a></p>
            </form>
        </div>
    </section>`;

export default async function loginView(ctx) {
    render(template(formSubmitHandler), document.querySelector('#wrapper main'));
}

async function formSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    // VALIDATION
    if (email === '' || password === '') {
        return alert('All fields are required!');
    }

    // ERROR-HANDLING
    try {
        const userData = await login(email, password);

        if (userData.code >= 400) {
            return alert(userData.message);
        }

        if (userData) {
            localStorage.setItem('email', userData.email);
            localStorage.setItem('accessToken', userData.accessToken);
            localStorage.setItem('_id', userData._id);
        }

        page.redirect('/');
    } catch (err) {
        return alert(err.message);
    }
}
