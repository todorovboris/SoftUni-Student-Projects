import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';

const errorBoxElm = document.querySelector('#errorBox');

const template = (message) => html` <span class="msg">${message}</span> `;

export default async function notificationMiddleware(ctx, next) {
    ctx.showNotification = (message) => {
        render(template(message), errorBoxElm);
        errorBoxElm.style.display = 'block';

        setTimeout(() => {
            errorBoxElm.style.display = 'none';
        }, 3000);
    };

    next();
}
