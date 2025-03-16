import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { editTattoo, getOne } from '../api/tattoos.js';
import page from '../../node_modules/page/page.mjs';

const template = (tattoo, onSubmit) => html`<!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <h2>Edit tattoo</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input type="text" value=${tattoo.type} name="type" id="type" placeholder="Tattoo Type" />
                <input type="text" value=${tattoo.imageUrl} name="image-url" id="image-url" placeholder="Image URL" />
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">value=${tattoo.description} </textarea>
                <select id="user-type" name="user-type" .value=${tattoo.userType}>
                    <option value="" disabled selected>Select your role</option>
                    <option value="Tattoo Artist">Tattoo Artist</option>
                    <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                    <option value="First Time in Tattoo">First Time in Tattoo</option>
                    <option value="Tattoo Collector">Tattoo Collector</option>
                </select>
                <button type="submit">Edit</button>
            </form>
        </div>
    </section>`;

export default async function editView(ctx) {
    const tattooId = ctx.params.tattooId;
    const tattoo = await getOne(tattooId);

    render(template(tattoo, formSubmitHandler.bind(ctx)), document.querySelector('#content main'));
}

async function formSubmitHandler(e) {
    e.preventDefault();

    const tattooData = {
        type: document.getElementById('type').value,
        imageUrl: document.getElementById('image-url').value,
        description: document.getElementById('description').value,
        userType: document.getElementById('user-type').value,
    };

    const tattooId = this.params.tattooId;

    // VALUDATION
    if (!Object.values(tattooData).every((value) => !!value)) {
        return 'All fields are required!';
    }

    // ERROR-HANDLING
    try {
        await editTattoo(tattooId, tattooData);
        page.redirect(`/dashboard/${tattooId}/details`);
    } catch (err) {
        return alert(err.message);
    }
}
