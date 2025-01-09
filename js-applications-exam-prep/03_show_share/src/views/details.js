import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getOne } from '../api/shows.js';

const tempalte = (show, isCreator, userId) => html`<!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${show.imageUrl}" alt="example1" />
            <div id="details-text">
                <p id="details-title">${show.title}</p>
                <div id="info-wrapper">
                    <div id="description">
                        <p id="details-description">${show.details}</p>
                    </div>
                </div>
                ${isCreator
                    ? html` <!--Edit and Delete are only for creator-->
                          <div id="action-buttons">
                              <a href="/dashboard/${show._id}/edit" id="edit-btn">Edit</a>
                              <a href="/dashboard/${show._id}/delete" id="delete-btn">Delete</a>
                          </div>`
                    : ''}
            </div>
        </div>
    </section>`;

export default async function detailsView(ctx) {
    const showId = ctx.params.showId;
    const show = await getOne(showId);
    // console.log(show);

    const userId = localStorage.getItem('_id');
    const isCreator = userId === show._ownerId;

    render(tempalte(show, isCreator, userId), document.querySelector('body main'));
}
