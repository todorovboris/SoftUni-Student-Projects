import { editSolution, getOne } from '../api/solutions.js';
import { render, html } from '../lib/lit-html.js';
import page from '../lib/page.js';

const template = (solution, onSubmit) => html`<!-- Edit Page (Only for logged-in users) -->
    <section id="edit">
        <div class="form">
            <img class="border" src="${solution.imageUrl}" alt="" />
            <h2>Edit Solution</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input type="text" value=${solution.type} name="type" id="type" placeholder="Solution Type" />
                <input type="text" value=${solution.imageUrl} name="image-url" id="imageUrl" placeholder="Image URL" />
                <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${solution.description}</textarea>
                <textarea id="learnMore" name="more-info" placeholder="more Info" rows="2" cols="10">${solution.learnMore}</textarea>
                <button type="submit">Edit</button>
            </form>
        </div>
    </section>`;

export default async function editView(ctx) {
    const solutionId = ctx.params.solutionId;
    const solution = await getOne(solutionId);

    render(template(solution, editFormSubmitHandler.bind(ctx)));
}

async function editFormSubmitHandler(e) {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const solutionData = Object.fromEntries(formData);
    const solutionData = {
        type: document.getElementById('type').value,
        imageUrl: document.getElementById('imageUrl').value,
        description: document.getElementById('description').value,
        learnMore: document.getElementById('learnMore').value,
    };

    const solutionId = this.params.solutionId;
    console.log(solutionId);

    // VALIDATION for empty fields
    if (!Object.values(solutionData).every((value) => !!value)) {
        return alert('All fields are required!');
    }

    try {
        await editSolution(solutionId, solutionData);
        page.redirect(`/dashboard/${solutionId}/details`);
    } catch (err) {
        alert(err.message);
    }
}
