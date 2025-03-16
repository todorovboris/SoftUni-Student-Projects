import { html, render } from '../../node_modules/lit-html/lit-html.js';

const template = () => html`<!-- Search page -->
    <section id="search">
        <div class="form">
            <h4>Search</h4>
            <form class="search-form">
                <input type="text" name="search" id="search-input" />
                <button class="button-list">Search</button>
            </form>
        </div>
        <div class="search-result">
            <h2 class="no-avaliable">No result.</h2>
            <!--If there are matches display a div with information about every motorcycle-->
            <div class="car">
                <img src="./images/pagani.jpg" alt="example1" />
                <h3 class="model">Pagani Huayrat</h3>
                <a class="details-btn" href="#">More Info</a>
            </div>
        </div>
    </section>`;

export default async function searchView(ctx) {
    render(template(), document.querySelector('#wrapper main'));
}
