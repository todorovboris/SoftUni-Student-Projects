import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getAll } from '../api/items.js';

const template = (items, isItemAvailable) => html`
    <!-- Dashboard page -->
    <h3 class="heading">Marketplace</h3>
    ${isItemAvailable
        ? html` <section id="dashboard">
              <!-- Display a div with information about every post (if any)-->
              ${items.map(
                  (item) => html`<div class="drone">
                      <img src="${item.imageUrl}" alt="example1" />
                      <h3 class="model">${item.model}</h3>
                      <div class="drone-info">
                          <p class="price">Price: €${item.price}</p>
                          <p class="condition">Condition: ${item.condition}</p>
                          <p class="weight">Weight: ${item.weight}g</p>
                      </div>
                      <a class="details-btn" href="/dashboard/${item._id}/details">Details</a>
                  </div>`
              )}
          </section>`
        : html`<!-- Display an h2 if there are no posts -->
              <h3 class="no-drones">No Drones Available</h3>`}
`;

export default async function dashboardView(ctx) {
    const items = await getAll();
    console.log(items);

    let isItemAvailable = false;
    if (items.length > 0) {
        isItemAvailable = true;
    }

    render(template(items, isItemAvailable), document.querySelector('#wrapper main'));
}
