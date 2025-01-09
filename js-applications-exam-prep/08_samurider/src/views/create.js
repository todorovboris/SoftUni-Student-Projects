import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { createItem } from '../api/items.js';

const template = (onSubmit) => html` <!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <h2>Add Motorcycle</h2>
        <div class="form">
            <h2>Add Motorcycle</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="model" id="model" placeholder="Model" />
                <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" />
                <input type="number" name="year" id="year" placeholder="Year" />
                <input type="number" name="mileage" id="mileage" placeholder="mileage" />
                <input type="text" name="contact" id="contact" placeholder="contact" />
                <textarea id="about" name="about" placeholder="about" rows="10" cols="50"></textarea>
                <button type="submit">Add Motorcycle</button>
            </form>
        </div>
    </section>`;

export default async function createView(ctx) {
    render(template(formSubmitHandler), document.querySelector('#wrapper main'));
}

async function formSubmitHandler(e) {
    e.preventDefault();

    const newItemData = {
        model: document.getElementById('model').value,
        imageUrl: document.getElementById('moto-image').value,
        year: document.getElementById('year').value,
        mileage: document.getElementById('mileage').value,
        contact: document.getElementById('contact').value,
        about: document.getElementById('about').value,
    };

    // VALIDATION
    if (!Object.values(newItemData).every((value) => !!value)) {
        return alert('All fields are required!');
    }

    // ERROR-H.
    try {
        await createItem(newItemData);
        page.redirect('/dashboard');
    } catch (err) {
        return alert(err.message);
    }
}
