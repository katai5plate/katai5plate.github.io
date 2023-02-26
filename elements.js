/** @type {HTMLDivElement} */
export const list = document.querySelector("div#list");
/** @type {HTMLButtonElement} */
export const more = document.querySelector("button#more");

export const ul = (children) => `<ul>${children.join("")}</ul>`;
export const li = (children) => `<li>${children.join("")}</li>`;
export const a = (href, child) => `<a href="${href}">${child}</a>`;
