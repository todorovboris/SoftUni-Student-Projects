import { html, render } from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { deleteItem } from '../api/items.js';

export default async function deleteView(ctx) {
    const isConfirmed = confirm('Are you sure you want to delete this drone?');
    if (!isConfirmed) return;

    try {
        const itemId = ctx.params.itemId;
        await deleteItem(itemId);
        page.redirect('/dashboard');
    } catch (err) {
        return alert(err.message);
    }
}
