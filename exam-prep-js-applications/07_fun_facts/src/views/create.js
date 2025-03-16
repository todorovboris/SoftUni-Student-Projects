import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { createItem } from '../api/items.js';
import page from '../../node_modules/page/page.mjs';

const template = (onSubmit) => html` <!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <div class="form">
            <h2>Add Fact</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="category" id="category" placeholder="Category" />
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
                <textarea id="description" name="description" placeholder="Description" rows="10" cols="50"></textarea>
                <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="10" cols="50"></textarea>
                <button type="submit">Add Fact</button>
            </form>
        </div>
    </section>`;

export default async function createView(ctx) {
    render(template(formSubmitHandler), document.querySelector('#wrapper main'));
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

    //ERROR-HANDLING
    try {
        await createItem(itemData);
        page.redirect('/dashboard');
    } catch (err) {
        return alert(err.message);
    }
}
