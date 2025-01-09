import { html, render } from 'https://unpkg.com/lit-html';
import { recipes } from '../service/recipes.js';

const mainSection = document.querySelector('body main');

const template = ({ article, isOwner }) => html`
    <article>
        <h2>${article.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="${article.img}" alt="${article.name}" />
            </div>

            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${article.ingredients.map((ingredient) => html`<li>${ingredient}</li>`)}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${article.steps.map((step) => html`<p>${step}</p>`)}
        </div>
        ${isOwner
            ? html`
                  <div>
                      <button>Edit</button>
                      <button>Delete</button>
                  </div>
              `
            : ''}
    </article>
`;

export default async function detailsPage(ctx) {
    const recipeId = ctx.params.recipeId;

    const article = await recipes.getOne(recipeId);

    const userId = localStorage.getItem('_id');
    const isOwner = article._ownerId === userId;

    render(
        template({
            article,
            isOwner,
        }),
        mainSection
    );
}
