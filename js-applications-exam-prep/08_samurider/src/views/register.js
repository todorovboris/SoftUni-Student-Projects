import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { register } from '../api/auth.js';

const template = (onSubmit) => html` <!-- Register Page (Only for Guest users) -->
    <section id="register">
        <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="register-form">
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
        </div>
    </section>`;

export default async function registerView(ctx) {
    render(template(formSubmitHandler), document.querySelector('#wrapper main'));
}

async function formSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('re-password');

    //VALIDATION
    if (email === '' || password === '' || rePassword === '') {
        return alert('All fields are requierd!');
    }
    if (password !== rePassword) {
        return alert("Passowrds doesn't match!");
    }

    // ERROR-HANDLING
    try {
        const userData = await register(email, password);

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
