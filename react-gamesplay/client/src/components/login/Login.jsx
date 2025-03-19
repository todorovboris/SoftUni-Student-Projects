import { useActionState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useLogin } from '../../api/authApi.js';

export default function Login({ onLogin }) {
    const navigate = useNavigate();
    const { login } = useLogin();

    const loginHandler = async (previousSate, formData) => {
        const values = Object.fromEntries(formData);
        const authData = await login(values.email, values.password);

        onLogin(authData);

        navigate('/games');
    };

    const [formValues, loginACtion, isPending] = useActionState(loginHandler, { email: '', password: '' });

    return (
        <section id="login-page" className="auth">
            <form id="login" action={loginACtion}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" />

                    <label htmlFor="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" value="Login" disabled={isPending} />
                    <p className="field">
                        <span>
                            If you don't have profile click <Link to="/register">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}
