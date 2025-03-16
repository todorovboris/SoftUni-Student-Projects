import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { deleteCar } from '../api/cars.js';
import page from '../../node_modules/page/page.mjs';

export default async function deleteView(ctx) {
    const carId = ctx.params.carId;
    const isConfirmed = confirm('Are you sure you want to delete this car?');

    if (!isConfirmed) return;

    try {
        await deleteCar(carId);
        page.redirect('/dashboard');
    } catch (err) {
        return alert(err.message);
    }
}
