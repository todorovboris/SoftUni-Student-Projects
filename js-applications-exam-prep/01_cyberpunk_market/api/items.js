import { request } from '../lib/requester.js';

const baseUrl = 'http://localhost:3030/data/cyberpunk';

export async function getAll() {
    const response = await fetch(`${baseUrl}?sortBy=_createdOn%20desc`);
    const items = await response.json();

    return items;
}

export async function getOne(itemId) {
    const response = await fetch(`${baseUrl}/${itemId}`);
    const item = await response.json();
    return item;
}

export async function createItem(itemData) {
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(itemData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();
    return data;
}

export async function editItem(itemId, data) {
    const response = await fetch(`${baseUrl}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(data),
    });

    const itemData = await response.json();
    return itemData;
}

export async function deleteItem(itemId) {
    const response = await fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
    });

    const itemData = await response.json();
    return itemData;
}

// export const getAll = () => request('GET', `${baseUrl}?sortBy=_createdOn%20desc`);

// export const getOne = (itemId) => request('GET', `${baseUrl}/${itemId}`);

// export const create = (itemData) => request('POST', `${baseUrl}`, itemData);

// export const edit = (itemId, data) => request('PUT', `${baseUrl}/${itemId}`, data);
