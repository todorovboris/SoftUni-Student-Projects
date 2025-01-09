import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/items.js';
import page from '../../node_modules/page/page.mjs';

const template = (items, isItemAvailable) => html`<!-- Dashboard page -->
    <h2>Fun Facts</h2>
    ${isItemAvailable
        ? html` <section id="dashboard">
              <!-- Display a div with information about every post (if any)-->
              ${items.map(
                  (item) => html` <div class="fact">
                      <img src="${item.imageUrl}" alt="example1" />
                      <h3 class="category">${item.category}</h3>
                      <p class="description">${item.description}</p>
                      <a class="details-btn" href="/dashboard/${item._id}/details">More Info</a>
                  </div>`
              )}
          </section>`
        : html` <!-- Display an h2 if there are no posts -->
              <h2>No Fun Facts yet.</h2>`} `;

export default async function dashboardView(ctx) {
    const items = await getAll();
    console.log(items);

    let isItemAvailable = false;
    if (items.length > 0) {
        isItemAvailable = true;
    }

    render(template(items, isItemAvailable), document.querySelector('#wrapper main'));
}
