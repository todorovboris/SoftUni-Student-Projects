const baseUrl = 'http://localhost:3030/data/drones';

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

    const item = await response.json();
    return item;
}

export async function editItem(itemId, itemData) {
    const response = await fetch(`${baseUrl}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(itemData),
    });

    if (!response.ok) {
        const error = response.json();
        throw new Error(error.message);
    }

    const item = await response.json();
    return item;
}

export async function deleteItem(itemId) {
    const response = await fetch(`${baseUrl}/${itemId}`, {
        method: 'DELETE',
        headers: { 'X-Authorization': localStorage.getItem('accessToken') },
    });

    const data = await response.json();
    return data;
}
