import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { createTattoo } from '../api/tattoos.js';
import page from '../../node_modules/page/page.mjs';

const template = (onSubmit) => html`<!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <div class="form">
            <h2>Add tattoo</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="type" id="type" placeholder="Tattoo Type" />
                <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
                <select id="user-type" name="user-type">
                    <option value="" disabled selected>Select your role</option>
                    <option value="Tattoo Artist">Tattoo Artist</option>
                    <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                    <option value="First Time in Tattoo">First Time in Tattoo</option>
                    <option value="Tattoo Collector">Tattoo Collector</option>
                </select>
                <button type="submit">Add tattoo</button>
            </form>
        </div>
    </section>`;

export default async function createView(ctx) {
    render(template(formSubmitHandler), document.querySelector('#content main'));
}

async function formSubmitHandler(e) {
    e.preventDefault();

    const tattoosData = {
        type: document.getElementById('type').value,
        imageUrl: document.getElementById('image-url').value,
        description: document.getElementById('description').value,
        userType: document.getElementById('user-type').value,
    };

    // VALIDATION
    if (!Object.values(tattoosData).every((value) => !!value)) {
        return 'All fields are required';
    }

    // ERROR-HANDLING
    try {
        await createTattoo(tattoosData);
        page.redirect('/dashboard');
    } catch (err) {
        return alert(err.message);
    }
}
