import { register } from '../api/auth.js';
import { html, render } from '../lib/lit-html.js';
import page from '../lib/page.js';

const template = () => html` <section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${registerFormSubmit} class="register-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export default async function registerView(ctx) {
    render(template());
}

async function registerFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('re-password');

    // VALIDATION
    if (email === '' || password === '' || rePassword === '' || password !== rePassword) {
        return alert`Passwords don't match`;
    }

    // ERROR HANDLING
    try {
        const userData = await register(email, password);

        if (userData.code >= 400) {
            return alert(userData.message);
        }

        if (userData) {
            localStorage.setItem('accessToken', userData.accessToken);
            localStorage.setItem('email', userData.email);
            localStorage.setItem('_id', userData._id);

            page.redirect('/');
        }
    } catch (err) {
        alert(err.message);
    }
}
