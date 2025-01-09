import { html, render } from 'https://unpkg.com/lit-html';

const headerSection = document.querySelector('.site-header');

const template = (isAuthenticated) => html` <h1>
        <a href="/"><img src="./assets/logo.png" />My Coockbook</a>
    </h1>
    <nav>
        <a href="/">Home</a>
        <a href="/catalog">Catalog</a>
        ${isAuthenticated
            ? html`
                  <a href="/create">Create Recipe</a>
                  <a href="/logout">Logout</a>
              `
            : html`
                  <a href="/login">Login</a>
                  <a href="/register">Register</a>
              `}
    </nav>`;

export default function renderNavigation(ctx, next) {
    const email = localStorage.getItem('email');
    const isAuthenticated = !!email;

    render(template(isAuthenticated), headerSection);

    next();
}
