// import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { html, render } from 'https://unpkg.com/lit-html';
import { recipes } from '../service/recipes.js';
import page from '//unpkg.com/page/page.mjs';

const mainSection = document.querySelector('body main');

const recipeTemplate = (recipes = [], onClick) => html`
    <section id="home-section">
        <div class="hero">
            <h2>Welcome to My Cookbook</h2>
        </div>
        <header class="section-title">Recently added recipes</header>
        <div class="recent-recipes">
            ${recipes.map(
                (recipe) => html`
                    <article @click=${() => onClick(recipe._id)} class="recent">
                        <div className="recent-preview">
                            <img src="${recipe.img}" alt="${recipe.img}" />
                        </div>
                        <div className="recent-title">${recipe.name}</div>
                    </article>
                `
            )}
        </div>
        <footer class="section-title">
            <p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
        </footer>
    </section>
`;

export default function homePage() {
    render(recipeTemplate([]), mainSection);

    const recipeClickHandler = (recipeId) => {
        page.redirect(`/catalog/${recipeId}`);
    };

    recipes.getRecent().then((recipes) => {
        render(recipeTemplate(recipes, recipeClickHandler), mainSection);
    });
}
