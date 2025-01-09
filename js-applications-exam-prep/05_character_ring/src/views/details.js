import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { getOne } from '../api/items.js';

const template = (item, isCreator, isLoggedIn) => html`<!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <div>
                <p id="details-category">${item.category}</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p id="description">${item.description}</p>
                        <p id="more-info">${item.moreInfo}</p>
                    </div>
                </div>
                <h3>Is This Useful:<span id="likes">0</span></h3>
                ${isLoggedIn
                    ? html`<!--Edit and Delete are only for creator-->
                          <div id="action-buttons">
                              ${isCreator
                                  ? html` <a href="/dashboard/${item._id}/edit" id="edit-btn">Edit</a>
                                        <a href="/dashboard/${item._id}/delete" id="delete-btn">Delete</a>`
                                  : html` <!--Bonus - Only for logged-in users ( not authors )-->
                                        <a href="" id="like-btn">Like</a>`}
                          </div>`
                    : ''}
            </div>
        </div>
    </section>`;

export default async function detailsView(ctx) {
    const itemId = ctx.params.itemId;
    const item = await getOne(itemId);

    const userId = localStorage.getItem('_id');
    const isCreator = userId === item._ownerId;

    const isLoggedIn = !!userId;

    render(template(item, isCreator, isLoggedIn), document.querySelector('#wrapper main'));
}
