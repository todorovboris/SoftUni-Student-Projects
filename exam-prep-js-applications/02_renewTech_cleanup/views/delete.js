import { deleteSolution } from '../api/solutions.js';
import { render, html } from '../lib/lit-html.js';
import page from '../lib/page.js';

export default async function deleteView(ctx) {
    const solutionId = ctx.params.solutionId;
    const isConfirmed = confirm('Are you sure you want to delete this item?');

    if (!isConfirmed) return;

    try {
        await deleteSolution(solutionId);
        page.redirect('/dashboard');
    } catch (err) {
        alert(err.message);
    }

    render(template());
}
