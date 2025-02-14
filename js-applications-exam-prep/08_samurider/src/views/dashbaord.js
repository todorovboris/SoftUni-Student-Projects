import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getAll } from '../api/items.js';

const template = (items, isItemAvailable) => html`<!-- Dashboard page -->
    <h2>Available Motorcycles</h2>
    ${isItemAvailable
        ? html` <section id="dashboard">
              <!-- Display a div with information about every post (if any)-->
              ${items.map(
                  (item) => html`<div class="motorcycle">
                      <img src="${item.imageUrl}" alt="example1" />
                      <h3 class="model">${item.model}</h3>
                      <p class="year">Year: ${item.year}</p>
                      <p class="mileage">Mileage: ${item.mileage} km.</p>
                      <p class="contact">Contact Number: ${item.contact}</p>
                      <a class="details-btn" href="/dashboard/${item._id}/details">More Info</a>
                  </div>`
              )}
          </section>`
        : html` <!-- Display an h2 if there are no posts -->
              <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`} `;

export default async function dashboardView(ctx) {
    const items = await getAll();
    console.log(items);

    let isItemAvailable = false;
    if (items.length > 0) {
        isItemAvailable = true;
    }

    render(template(items, isItemAvailable), document.querySelector('#wrapper main'));
}
