import { html, render } from '../../node_modules/lit-html/lit-html.js';

const template = (isAuthenticated) => html`<!-- Navigation -->
    <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="logo" /> </a>
    <nav>
        <a href="/dashboard">Collection</a>
        ${isAuthenticated
            ? html` <!-- Logged-in users -->
                  <div class="user">
                      <a href="/create">Add Tattoo</a>
                      <a id="logout" href="/logout">Logout</a>
                  </div>`
            : html` <!-- Guest users -->
                  <div class="guest">
                      <a href="/login">Login</a>
                      <a href="/register">Register</a>
                  </div>`}
    </nav>`;

export default function navigationView(ctx, next) {
    const accessToken = localStorage.getItem('accessToken');
    const isAuthenticated = !!accessToken;

    render(template(isAuthenticated), document.querySelector('#content header'));

    next();
}
