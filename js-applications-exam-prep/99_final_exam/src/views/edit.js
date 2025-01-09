import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { editItem, getOne } from '../api/items.js';

const template = (item, onSubmit) => html`<!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form form-item">
            <h2>Edit Offer</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input type="text" value=${item.model} name="model" id="model" placeholder="Drone Model" />
                <input type="text" value=${item.imageUrl} name="imageUrl" id="imageUrl" placeholder="Image URL" />
                <input type="number" value=${item.price} name="price" id="price" placeholder="Price" />
                <input type="number" value=${item.weight} name="weight" id="weight" placeholder="Weight" />
                <input type="number" value=${item.phone} name="phone" id="phone" placeholder="Phone Number for Contact" />
                <input type="text" value=${item.condition} name="condition" id="condition" placeholder="Condition" />
                <textarea name="description" id="description" placeholder="Description">${item.description}</textarea>
                <button type="submit">Edit</button>
            </form>
        </div>
    </section>`;

export default async function editView(ctx) {
    const itemId = ctx.params.itemId;
    const item = await getOne(itemId);

    render(template(item, formSubmitHandler.bind(ctx)), document.querySelector('#wrapper main'));
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
        const itemId = this.params.itemId;
        await editItem(itemId, itemData);

        page.redirect(`/dashboard/${itemId}/details`);
    } catch (err) {
        return alert(err.message);
    }
}
