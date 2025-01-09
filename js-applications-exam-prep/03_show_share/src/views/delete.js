import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { deleteShow } from '../api/shows.js';
import page from '../../node_modules/page/page.mjs';

export default async function deleteView(ctx) {
    const showId = ctx.params.showId;
    const isConfirmed = confirm('Are you sure you want to delete this show?');

    if (!isConfirmed) return;

    try {
        await deleteShow(showId);
        page.redirect('/dashboard');
    } catch (err) {
        alert(err.message);
    }
}
