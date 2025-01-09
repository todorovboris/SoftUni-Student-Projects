import { createSolution } from '../api/solutions.js';
import { render, html } from '../lib/lit-html.js';
import page from '../lib/page.js';

const template = (onSubmit) => html`<!-- Create Page (Only for logged-in users) -->
    <section id="create">
        <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Add Solution</h2>
            <form @submit=${onSubmit} class="create-form">
                <input type="text" name="type" id="type" placeholder="Solution Type" />
                <input type="text" name="image-url" id="imageUrl" placeholder="Image URL" />
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
                <textarea id="learnMore" name="more-info" placeholder="more Info" rows="2" cols="10"></textarea>
                <button type="submit">Add Solution</button>
            </form>
        </div>
    </section>`;

export default async function createView(ctx) {
    render(template(formSubmitHandler));
}

async function formSubmitHandler(e) {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const solutionData = Object.fromEntries(formData);
    const solutionData = {
        type: document.getElementById('type').value,
        imageUrl: document.getElementById('imageUrl').value,
        description: document.getElementById('description').value,
        learnMore: document.getElementById('learnMore').value,
    };

    // VALIDATION for empty fields
    if (!Object.values(solutionData).every((value) => !!value)) {
        return alert('All fields are required!');
    }

    try {
        await createSolution(solutionData);
        page.redirect('/dashboard');
    } catch (err) {
        alert(err.message);
    }
}
