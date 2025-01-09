import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { createShow } from '../api/shows.js';
import page from '../../node_modules/page/page.mjs';

const tempalte = (onSubmit) => html`<!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <div class="form">
            <h2>Add Show</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="title" id="title" placeholder="TV Show title" />
                <input type="text" name="image-url" id="imageUrl" placeholder="Image URL" />
                <input type="text" name="genre" id="genre" placeholder="Genre" />
                <input type="text" name="country" id="country" placeholder="Country" />
                <textarea id="details" name="details" placeholder="Details" rows="2" cols="10"></textarea>
                <button type="submit">Add Show</button>
            </form>
        </div>
    </section>`;

export default async function createView() {
    render(tempalte(formSubmitHandler), document.querySelector('body main'));
}

async function formSubmitHandler(e) {
    e.preventDefault();

    const showsData = {
        title: document.getElementById('title').value,
        imageUrl: document.getElementById('imageUrl').value,
        genre: document.getElementById('genre').value,
        country: document.getElementById('country').value,
        details: document.getElementById('details').value,
    };

    // VALIDATION
    if (!Object.values(showsData).every((value) => !!value)) {
        return 'All fields are required!';
    }

    // ERROR-HANDLING
    try {
        await createShow(showsData);
        page.redirect('/dashboard');
    } catch (err) {
        alert(err.message);
    }
}
