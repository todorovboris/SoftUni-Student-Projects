import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { editItem, getOne } from '../api/items.js';

const template = (item, onSubmit) => html`<!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <h2>Edit Motorcycle</h2>
        <div class="form">
            <h2>Edit Motorcycle</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input type="text" value=${item.model} name="model" id="model" placeholder="Model" />
                <input type="text" value=${item.imageUrl} name="imageUrl" id="moto-image" placeholder="Moto Image" />
                <input type="number" value=${item.year} name="year" id="year" placeholder="Year" />
                <input type="number" value=${item.mileage} name="mileage" id="mileage" placeholder="mileage" />
                <input type="number" value=${item.contact} name="contact" id="contact" placeholder="contact" />
                <textarea id="about" name="about" placeholder="about" rows="10" cols="50">${item.about} </textarea>
                <button type="submit">Edit Motorcycle</button>
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
        imageUrl: document.getElementById('moto-image').value,
        year: document.getElementById('year').value,
        mileage: document.getElementById('mileage').value,
        contact: document.getElementById('contact').value,
        about: document.getElementById('about').value,
    };

    // VALIDATION
    if (!Object.values(itemData).every((value) => !!value)) {
        return alert('All fields are required!');
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
