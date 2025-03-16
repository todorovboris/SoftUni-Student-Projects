import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const template = (isLoggedIn) => html`<!-- Navigation -->
    <a id="logo" href="/"><img id="logo" src="./images/logo2.png" alt="img" /></a>
    <nav>
        <div>
            <a href="/dashboard">Marketplace</a>
        </div>
        ${isLoggedIn
            ? html` <!-- Logged-in users -->
                  <div class="user">
                      <a href="/create">Sell</a>
                      <a href="/logout">Logout</a>
                  </div>`
            : html` <!-- Guest users -->
                  <div class="guest">
                      <a href="/login">Login</a>
                      <a href="/register">Register</a>
                  </div>`}
    </nav>`;

export default async function navigationMiddleware(ctx, next) {
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedIn = !!accessToken;

    render(template(isLoggedIn), document.querySelector('#wrapper header'));

    next();
}
