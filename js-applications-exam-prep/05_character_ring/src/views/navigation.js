import { html, render } from '../../node_modules/lit-html/lit-html.js';

const template = (isLoggedIn) => html`<!-- Navigation -->
    <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
    <nav>
        <div>
            <a href="/dashboard">Characters</a>
        </div>
        ${isLoggedIn
            ? html` <!-- Logged-in users -->
                  <div class="user">
                      <a href="/create">Add Character</a>
                      <a href="/logout">Logout</a>
                  </div>`
            : html` <!-- Guest users -->
                  <div class="guest">
                      <a href="/login">Login</a>
                      <a href="/register">Register</a>
                  </div>`}
    </nav>`;

export default async function navigationView(ctx, next) {
    const accessToken = localStorage.getItem('accessToken');
    const isLoggedIn = !!accessToken;

    render(template(isLoggedIn), document.querySelector('#wrapper header'));

    next();
}
