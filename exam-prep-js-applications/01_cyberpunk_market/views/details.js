import { html, render } from '../../lib/lit-html.js';
import { getOne } from '../api/items.js';

const template = (item, isCreator) => html` <!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <div>
                <img id="details-img" src="${item.imageUrl}" alt=${item.item} />
                <p id="details-title">${item.item}</p>
            </div>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="details-price">Price: €${item.price}</p>
                    <p class="details-availability">${item.availability}</p>
                    <p class="type">Type: ${item.type}</p>
                    <p id="item-description">${item.description}</p>
                </div>
                <!--Edit and Delete are only for creator-->
                ${isCreator
                    ? html` <div id="action-buttons">
                          <a href="/dashboard/${item._id}/edit" id="edit-btn">Edit</a>
                          <a href="/dashboard/${item._id}/delete" id="delete-btn">Delete</a>
                      </div>`
                    : ''}
            </div>
        </div>
    </section>`;

export default async function detailsView(ctx) {
    const itemId = ctx.params.itemId;
    const item = await getOne(itemId);

    const userId = localStorage.getItem('_id');
    const isCreator = item._ownerId === userId;

    render(template(item, isCreator));
}
