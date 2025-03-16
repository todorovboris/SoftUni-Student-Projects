import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { getOne } from '../api/items.js';

const template = (item, isCreator) => html`<!-- Details page -->
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src="${item.imageUrl}" alt="example1" />
            <p id="details-title">${item.model}</p>
            <div id="info-wrapper">
                <div id="details-description">
                    <p class="year">Year: ${item.year}</p>
                    <p class="mileage">Mileage: ${item.mileage} km.</p>
                    <p class="contact">Contact Number: ${item.contact}</p>
                    <p id="motorcycle-description">${item.about}</p>
                </div>
                ${isCreator
                    ? html` <!--Edit and Delete are only for creator-->
                          <div id="action-buttons">
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
