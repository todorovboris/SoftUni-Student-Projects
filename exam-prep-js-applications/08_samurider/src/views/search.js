import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const template = () => html`<!-- Search page -->
    <section id="search">
        <div class="form">
            <h4>Search</h4>
            <form class="search-form">
                <input type="text" name="search" id="search-input" />
                <button class="button-list">Search</button>
            </form>
        </div>
        <h4 id="result-heading">Results:</h4>
        <div class="search-result">
            <h2 class="no-avaliable">No result.</h2>
            <!--If there are matches display a div with information about every motorcycle-->
            <div class="motorcycle">
                <img src="./images/Honda Hornet.png" alt="example1" />
                <h3 class="model">Honda Hornet</h3>
                <a class="details-btn" href="">More Info</a>
            </div>
        </div>
    </section>`;

export default async function searchView(ctx) {
    render(template(), document.querySelector('#wrapper main'));
}
