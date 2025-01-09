import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getOne } from '../api/cars.js';

const template = (car, isCreator) => html`<!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${car.imageUrl}" alt="example1" />
            <p id="details-title">${car.model}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="price">Price: €${car.price}</p>
                    <p class="weight">Weight: ${car.weight} kg</p>
                    <p class="top-speed">Top Speed: ${car.speed} kph</p>
                    <p id="car-description">${car.about}</p>
                </div>
                ${isCreator
                    ? html` <!--Edit and Delete are only for creator-->
                          <div id="action-buttons">
                              <a href="/dashboard/${car._id}/edit" id="edit-btn">Edit</a>
                              <a href="/dashboard/${car._id}/delete" id="delete-btn">Delete</a>
                          </div>`
                    : ''}
            </div>
        </div>
    </section>`;

export default async function detailsView(ctx) {
    const carId = ctx.params.carId;
    const car = await getOne(carId);

    const userId = localStorage.getItem('_id');
    const isCreator = userId === car._ownerId;

    render(template(car, isCreator), document.querySelector('#wrapper main'));
}
