import { render as baseRender, html } from '../node_modules/lit-html/lit-html.js';

const mainElement = document.querySelector('body main');

export const render = (template) => baseRender(template, mainElement);
export { html, baseRender };
