import { getAll } from '../api/solutions.js';
import { render, html } from '../lib/lit-html.js';

const template = (solutions, isNotEmpty) => html`<!-- Dashboard page -->
    <h2>Solutions</h2>
    <section id="solutions">
        ${isNotEmpty
            ? html`
                  <!-- Display a div with information about every post (if any)-->
                  ${solutions.map(
                      (solution) => html` <div class="solution">
                          <img src="${solution.imageUrl}" alt="example1" />
                          <div class="solution-info">
                              <h3 class="type">${solution.type}</h3>
                              <p class="description">${solution.description}</p>
                              <a class="details-btn" href="/dashboard/${solution._id}/details">Learn More</a>
                          </div>
                      </div>`
                  )}
              </section>`
            : html` <!-- Display an h2 if there are no posts -->
                  <h2 id="no-solution">No Solutions Added.</h2>`}
    </section> `;

export default async function dashboardView(ctx) {
    const solutions = await getAll();
    console.log(solutions);

    let isNotEmpty = false;
    if (solutions.length > 0) {
        isNotEmpty = true;
    }

    render(template(solutions, isNotEmpty));
}
