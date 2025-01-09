import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { editCar, getOne } from '../api/cars.js';
import page from '../../node_modules/page/page.mjs';

const template = (car, onSubmit) => html`<!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input type="text" value=${car.model} name="model" id="model" placeholder="Model" />
                <input type="text" value=${car.imageUrl} name="imageUrl" id="car-image" placeholder="Your Car Image URL" />
                <input type="text" value=${car.price} name="price" id="price" placeholder="Price in Euro" />
                <input type="number" value=${car.weight} name="weight" id="weight" placeholder="Weight in Kg" />
                <input type="text" value=${car.speed} name="speed" id="speed" placeholder="Top Speed in Kmh" />
                <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50">${car.about} </textarea>
                <button type="submit">Edit</button>
            </form>
        </div>
    </section>`;

export default async function editView(ctx) {
    const carId = ctx.params.carId;
    const car = await getOne(carId);

    render(template(car, formSubmitHandler.bind(ctx)), document.querySelector('#wrapper main'));
}

async function formSubmitHandler(e) {
    e.preventDefault();

    const carData = {
        model: document.getElementById('model').value,
        imageUrl: document.getElementById('car-image').value,
        price: document.getElementById('price').value,
        weight: document.getElementById('weight').value,
        speed: document.getElementById('speed').value,
        about: document.getElementById('about').value,
    };

    // VALIDATION
    if (!Object.values(carData).every((value) => !!value)) {
        return alert('All fields are required!');
    }

    // ERROR-HANDLING
    try {
        const carId = this.params.carId;
        await editCar(carId, carData);
        page.redirect(`/dashboard/${carId}/details`);
    } catch (err) {
        return alert(err.message);
    }
}
