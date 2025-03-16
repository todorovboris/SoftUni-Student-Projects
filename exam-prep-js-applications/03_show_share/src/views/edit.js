import { editShow, getOne } from '../api/shows.js';
import { html, render } from 'lit-html/lit-html.js';
import page from 'page/page.mjs';

const tempalte = (show, onSubmit) => html`<!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <h2>Edit Show</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input type="text" value=${show.title} name="title" id="title" placeholder="TV Show title" />
                <input type="text" value=${show.imageUrl} name="image-url" id="image-url" placeholder="Image URL" />
                <input type="text" value=${show.genre} name="genre" id="genre" placeholder="Genre" />
                <input type="text" value=${show.country} name="country" id="country" placeholder="Country" />
                <textarea id="details" name="details" placeholder="Details" rows="2" cols="10">${show.details}</textarea>
                <button type="submit">Edit Show</button>
            </form>
        </div>
    </section>`;

export default async function editView(ctx) {
    const showId = ctx.params.showId;
    const show = await getOne(showId);

    render(tempalte(show, formSubmitHandler.bind(ctx)), document.querySelector('body main'));
}

async function formSubmitHandler(e) {
    e.preventDefault();

    //
    //
    const showData = {
        title: document.getElementById('title').value,
        imageUrl: document.getElementById('image-url').value,
        genre: document.getElementById('genre').value,
        country: document.getElementById('country').value,
        details: document.getElementById('details').value,
    };

    const showId = this.params.showId;

    // VALIDATION
    if (!Object.values(showData).every((value) => !!value)) {
        return alert('All fields are required!');
    }

    // ERROR-HANDLING
    try {
        await editShow(showId, showData);
        page.redirect(`/dashboard/${showId}/details`);
    } catch (err) {
        alert(err.message);
    }
}
