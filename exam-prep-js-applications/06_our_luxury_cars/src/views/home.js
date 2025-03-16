import { html, render } from '../../node_modules/lit-html/lit-html.js';

const template = () => html` <!-- Home page -->
    <section id="hero">
        <h1>Accelerate Your Passion Unleash the Thrill of Sport Cars Together!</h1>
    </section>`;

export default async function homeView(ctx) {
    render(template(), document.querySelector('#wrapper main'));
}
