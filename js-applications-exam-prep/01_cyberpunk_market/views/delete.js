import { deleteItem } from '../api/items.js';
import page from '../lib/page.js';

export default async function deleteView(ctx) {
    const itemId = ctx.params.itemId;
    const isConfirmed = confirm('Are you sure you want to delete this item?');

    if (!isConfirmed) {
        return;
    }

    try {
        await deleteItem(itemId);
        page.redirect('/dashboard');
    } catch (err) {
        alert(err.message);
    }
}
