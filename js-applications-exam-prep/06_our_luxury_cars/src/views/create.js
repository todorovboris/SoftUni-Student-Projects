import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { createCar } from '../api/cars.js';
import page from '../../node_modules/page/page.mjs';

const template = (onSubmit) => html`<!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <div class="form form-auto">
            <h2>Share Your Car</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="model" id="model" placeholder="Model" />
                <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL" />
                <input type="text" name="price" id="price" placeholder="Price in Euro" />
                <input type="number" name="weight" id="weight" placeholder="Weight in Kg" />
                <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh" />
                <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50"></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    </section>`;

export default async function createView(ctx) {
    render(template(formSubmitHandler), document.querySelector('#wrapper main'));
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
        await createCar(carData);
        page.redirect('/dashboard');
    } catch (err) {
        return alert(err.message);
    }
}
