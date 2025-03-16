import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/tattoos.js';

const template = (tattoos, isTattooAvailable) => html`<!-- Dashboard page -->
    <h2>Collection</h2>
    ${isTattooAvailable
        ? html` <section id="tattoos">
              <!-- Display a div with information about every post (if any)-->
              ${tattoos.map(
                  (tattoo) => html`<div class="tattoo">
                      <img src="${tattoo.imageUrl}" alt="example1" />
                      <div class="tattoo-info">
                          <h3 class="type">${tattoo.type}</h3>
                          <span>Uploaded by </span>
                          <p class="user-type">${tattoo.userType}</p>
                          <a class="details-btn" href="/dashboard/${tattoo._id}/details">Learn More</a>
                      </div>
                  </div>`
              )}
          </section>`
        : html` <!-- Display an h2 if there are no posts -->
              <h2 id="no-tattoo">Collection is empty, be the first to contribute</h2>`} `;

export default async function dashboardView(ctx) {
    const tattoos = await getAll();
    console.log(tattoos);

    let isTattooAvailable = false;
    if (tattoos.length > 0) {
        isTattooAvailable = true;
    }

    render(template(tattoos, isTattooAvailable), document.querySelector('#content main'));
}
