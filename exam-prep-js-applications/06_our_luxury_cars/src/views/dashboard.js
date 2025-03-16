import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/cars.js';

const template = (cars, isCarAvailable) => html`<!-- Dashboard page -->
    <h3 class="heading">Our Cars</h3>
    <section id="dashboard">
        ${isCarAvailable
            ? html`<!-- Display a div with information about every post (if any)-->
                  ${cars.map(
                      (car) => html` <div class="car">
                          <img src="${car.imageUrl}" alt="example1" />
                          <h3 class="model">${car.model}</h3>
                          <div class="specs">
                              <p class="price">Price: €${car.price}</p>
                              <p class="weight">Weight: ${car.weight} kg</p>
                              <p class="top-speed">Top Speed: ${car.speed} kph</p>
                          </div>
                          <a class="details-btn" href="/dashboard/${car._id}/details">More Info</a>
                      </div>`
                  )} `
            : html` <!-- Display an h2 if there are no posts -->
                  <h3 class="nothing">Nothing to see yet</h3>`}
    </section> `;

export default async function dashboardView(ctx) {
    const cars = await getAll();
    console.log(cars);

    let isCarAvailable = false;
    if (cars.length > 0) {
        isCarAvailable = true;
    }

    render(template(cars, isCarAvailable), document.querySelector('#wrapper main'));
}
