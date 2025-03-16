import { html, render } from 'lit-html/lit-html.js';
import { getAll } from '../api/shows.js';

const tempalte = (shows, isShowAvailable) => html`<!-- Dashboard page -->
    <h2>Users Recommendations</h2>
    ${isShowAvailable
        ? html` <section id="shows">
              <!-- Display a div with information about every post (if any)-->
              ${shows.map(
                  (show) =>
                      html` <div class="show">
                          <img src="${show.imageUrl}" alt="example1" />
                          <div class="show-info">
                              <h3 class="title">${show.title}</h3>
                              <p class="genre">${show.genre}</p>
                              <p class="country-of-origin">${show.country}</p>
                              <a class="details-btn" href="/dashboard/${show._id}/details">Details</a>
                          </div>
                      </div>`
              )}
          </section>`
        : html` <!-- Display an h2 if there are no posts -->
              <h2 id="no-show">No shows Added.</h2>`} `;

export default async function dashboardView(ctx) {
    const shows = await getAll();
    console.log(shows);

    let isShowAvailable = false;
    if (shows.length > 0) {
        isShowAvailable = true;
    }
    render(tempalte(shows, isShowAvailable), document.querySelector('body main'));
}
