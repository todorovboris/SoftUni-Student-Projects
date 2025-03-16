import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { deleteTattoo } from '../api/tattoos.js';
import page from '../../node_modules/page/page.mjs';

export default async function deleteView(ctx) {
    const tattooId = ctx.params.tattooId;
    const isConfirmed = confirm('Are you sure you want to delete this tattoo?');

    if (!isConfirmed) return;

    try {
        await deleteTattoo(tattooId);
        page.redirect('/dashboard');
    } catch (err) {
        alert(err.message);
    }
}
