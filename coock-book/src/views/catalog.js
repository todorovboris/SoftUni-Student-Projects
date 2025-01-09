import { html, render } from 'https://unpkg.com/lit-html';
import { recipes } from '../service/recipes.js';
import page from '//unpkg.com/page/page.mjs';

const mainSection = document.querySelector('body main');

const template = (recipes = [], onSearch) => html`
    <section id="catalog-section">
        <form @submit=${onSearch} style="display: flex; justify-content: center;">
            <div>
                <input type="text" name="search" style="position: unset;" />
                <input type="submit" value="Search" style="display: inline" />
            </div>
        </form>

        ${recipes.map(
            (recipe) => html`
                <article @click=${() => recipeClickHandler(recipe._id)} class="preview" id="${recipe._id}">
                    <div class="title">
                        <h2>${recipe.name}</h2>
                    </div>
                    <div class="small">
                        <img src="${recipe.img}" alt="${recipe.name}" />
                    </div>
                </article>
            `
        )}
    </section>
`;

export default function catalogPage(ctx) {
    const searchParams = new URLSearchParams(ctx.querystring);
    const filter = {
        search: searchParams.get('search'),
    };

    render(template([], searchHandler), mainSection);

    recipes
        .getAll(filter)
        .then((recipes) => {
            render(template(recipes, searchHandler), mainSection);
        })
        .catch((err) => alert(err.message));
}

async function recipeClickHandler(recipeId) {
    page.redirect(`/catalog/${recipeId}`);
}

function searchHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search');

    page.redirect(`/catalog?search=${search}`);
}

// function editRecipe() {
//     console.log('edit');
// }

// function deleteRecipe() {
//     console.log('delete');
// }
