import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getOne } from '../api/items.js';

const template = (item, isCreator) => html`<!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <div>
                <img id="details-img" src="${item.imageUrl}" alt="example1" />
                <p id="details-model">${item.model}</p>
            </div>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="details-price">Price: €${item.price}</p>
                    <p class="details-condition">Condition: ${item.condition}</p>
                    <p class="details-weight">Weight: ${item.weight}g</p>
                    <p class="drone-description">${item.description}</p>
                    <p class="phone-number">Phone: ${item.phone}</p>
                </div>
                ${isCreator
                    ? html` <!--Edit and Delete are only for creator-->
                          <div class="buttons">
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
    const isCreator = userId === item._ownerId;

    render(template(item, isCreator), document.querySelector('#wrapper main'));
}
