import { html, render } from '../../node_modules/lit-html/lit-html.js';

const template = (isLoggedIn) => html`<!-- Navigation -->
    <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>

    <nav>
        <div>
            <a href="/dashboard">Fun Facts</a>
        </div>
        ${isLoggedIn
            ? html` <!-- Logged-in users -->
                  <div class="user">
                      <a href="/create">Add Fact</a>
                      <a href="/logout">Logout</a>
                  </div>`
            : html` <!-- Guest users -->
                  <div class="guest">
                      <a href="/login">Login</a>
                      <a href="/register">Register</a>
                  </div>`}
    </nav>`;

export default async function navigationView(ctx, next) {
    const userId = localStorage.getItem('_id');
    const isLoggedIn = !!userId;

    render(template(isLoggedIn), document.querySelector('#wrapper header'));

    next();
}
