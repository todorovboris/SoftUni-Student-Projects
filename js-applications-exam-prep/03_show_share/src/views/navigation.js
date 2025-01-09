import { html, render } from '../../node_modules/lit-html/lit-html.js';

const tempalte = (isAuthenticated) => html`<!-- Navigation -->
    <a id="logo" href="/"><img id="logo-img" src="./images/show_logo.png" alt="logo" /> </a>
    <nav>
        <div>
            <a href="/dashboard">TV Shows</a>
            <a href="#">Search</a>
        </div>
        ${isAuthenticated
            ? html` <!-- Logged-in users -->
                  <div class="user">
                      <a href="/create">Add Show</a>
                      <a href="/logout">Logout</a>
                  </div>`
            : html` <!-- Guest users -->
                  <div class="guest">
                      <a href="/login">Login</a>
                      <a href="/register">Register</a>
                  </div>`}
    </nav>`;

export default function renderNavigation(ctx, next) {
    const accessToken = localStorage.getItem('accessToken');
    const isAuthenticated = !!accessToken;

    render(tempalte(isAuthenticated), document.querySelector('#wrapper header'));

    next();
}
