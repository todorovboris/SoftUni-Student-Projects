import { getOne } from '../api/solutions.js';
import { render, html } from '../lib/lit-html.js';

const template = (solution, isCreator, userId) => html`<!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${solution.imageUrl}" alt="example1" />
            <div>
                <p id="details-type">${solution.type}</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p id="description">${solution.description}</p>
                        <p id="more-info">${solution.learnMore}</p>
                    </div>
                </div>
                <h3>Like Solution:<span id="like">0</span></h3>
                ${userId
                    ? html`<!--Edit and Delete are only for creator-->
                          <div id="action-buttons">
                              ${isCreator
                                  ? html` <a href="/dashboard/${solution._id}/edit" id="edit-btn">Edit</a>
                                        <a href="/dashboard/${solution._id}/delete" id="delete-btn">Delete</a>`
                                  : html` <!--Bonus - Only for logged-in users ( not authors )-->
                                        <a href="#" id="like-btn">Like</a>`}
                          </div>`
                    : ''}
            </div>
        </div>
    </section>`;

export default async function detailsView(ctx) {
    const solutionId = ctx.params.solutionId;
    const solution = await getOne(solutionId);

    const userId = localStorage.getItem('_id');
    const isCreator = userId === solution._ownerId;

    render(template(solution, isCreator, userId));
}
