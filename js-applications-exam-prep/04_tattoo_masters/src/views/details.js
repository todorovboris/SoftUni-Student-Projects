import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getOne } from '../api/tattoos.js';

const template = (tattoo, isCreator, isLoggedIn) => html`<!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${tattoo.imageUrl}" alt="example1" />
            <div>
                <div id="info-wrapper">
                    <p id="details-type">${tattoo.type}</p>
                    <div id="details-description">
                        <p id="user-type">${tattoo.userType}</p>
                        <p id="description">${tattoo.description}</p>
                    </div>
                    <h3>Like tattoo:<span id="like">0</span></h3>
                    ${isLoggedIn
                        ? html`<!--Edit and Delete are only for creator-->
                            ${
                                isCreator
                                    ? html` <div id="action-buttons">
                                          <a href="/dashboard/${tattoo._id}/edit" id="edit-btn">Edit</a>
                                          <a href="/dashboard/${tattoo._id}/delete" id="delete-btn">Delete</a>
                                      </div>`
                                    : html` <!--Bonus - Only for logged-in users ( not authors )-->
                                          <a href="#" id="like-btn">Like</a>`
                            }
                              </div>`
                        : ''}
                </div>
            </div>
        </div>
    </section>`;

export default async function detailsView(ctx) {
    const tattooId = ctx.params.tattooId;
    const tattoo = await getOne(tattooId);

    const userId = localStorage.getItem('_id');
    const isCreator = userId === tattoo._ownerId;

    const isLoggedIn = !!userId;

    render(template(tattoo, isCreator, isLoggedIn), document.querySelector('#content main'));
}
