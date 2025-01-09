import { html, baseRender } from '../lib/lit-html.js';

const template = (isAuthenticated) => html` <a id="logo" href="/"><img id="logo" src="./images/logo.png" alt="img" /></a>
    <nav>
        <div>
            <a href="/dashboard">Market</a>
        </div>
        ${isAuthenticated
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

const headerElement = document.querySelector('#wrapper header');

export default function renderNavigation(ctx, next) {
    const acessToken = localStorage.getItem('email');
    const isAuthenticated = !!acessToken;

    baseRender(template(isAuthenticated), headerElement);

    next();
}
