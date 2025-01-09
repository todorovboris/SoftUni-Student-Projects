import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const template = () => html` <!-- Home page -->
    <section id="hero">
        <p>
            Discover the best deals on drones! Buy, sell, and trade top-quality drones with ease on Drone Deals - your trusted marketplace for all things drone.
        </p>
    </section>`;

export default async function homeView(ctx) {
    render(template(), document.querySelector('#wrapper main'));
}
