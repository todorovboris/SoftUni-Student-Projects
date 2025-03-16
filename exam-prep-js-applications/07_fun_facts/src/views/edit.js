import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { editItem, getOne } from '../api/items.js';

const template = (item, onSubmit) => html`<!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <h2>Edit Fact</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input type="text" value=${item.category} name="category" id="category" placeholder="Category" />
                <input type="text" value=${item.imageUrl} name="image-url" id="image-url" placeholder="Image URL" />
                <textarea id="description" name="description" placeholder="Description" rows="10" cols="50">${item.description}</textarea>
                <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="10" cols="50">${item.moreInfo}</textarea>
                <button type="submit">Post</button>
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
        category: document.getElementById('category').value,
        imageUrl: document.getElementById('image-url').value,
        description: document.getElementById('description').value,
        moreInfo: document.getElementById('additional-info').value,
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
