import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const template = () => html` <!-- Home page -->
    <section id="home">
        <h1>Welcome to <span>Samurider</span> moto market, your premier destination for Japanese motorcycles.</h1>
        <img src="./images/motorcycle.png" alt="home" />
    </section>`;

export default async function homeView(ctx) {
    render(template(), document.querySelector('#wrapper main'));
}
