import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { createItem } from '../api/items.js';

const template = (onSubmit) => html` <!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <div class="form form-item">
            <h2>Add Drone Offer</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="model" id="model" placeholder="Drone Model" />
                <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
                <input type="number" name="price" id="price" placeholder="Price" />
                <input type="number" name="weight" id="weight" placeholder="Weight" />
                <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
                <input type="text" name="condition" id="condition" placeholder="Condition" />
                <textarea name="description" id="description" placeholder="Description"></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    </section>`;

export default async function createView(ctx) {
    render(template(formSubmitHandler.bind(ctx)), document.querySelector('#wrapper main'));
}

async function formSubmitHandler(e) {
    e.preventDefault();

    const itemData = {
        model: document.getElementById('model').value,
        imageUrl: document.getElementById('imageUrl').value,
        price: document.getElementById('price').value,
        condition: document.getElementById('condition').value,
        weight: document.getElementById('weight').value,
        phone: document.getElementById('phone').value,
        description: document.getElementById('description').value,
    };

    // VALIDATION
    if (!Object.values(itemData).every((value) => !!value)) {
        // return alert('All fields are required!');
        return this.showNotification('All fields are required!');
    }

    // ERROR-HANDLING
    try {
        await createItem(itemData);
        page.redirect('/dashboard');
    } catch (err) {
        return alert(err.message);
    }
}
