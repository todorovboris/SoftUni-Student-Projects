const baseUrl = 'http://localhost:3030/data/shows';

export async function getAll() {
    const response = await fetch(`${baseUrl}?sortBy=_createdOn%20desc`);
    const shows = await response.json();

    return shows;
}

export async function getOne(showId) {
    const response = await fetch(`${baseUrl}/${showId}`);
    const show = await response.json();

    return show;
}

export async function createShow(showsData) {
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(showsData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const showData = await response.json();
    return showData;
}

export async function editShow(showId, data) {
    const response = await fetch(`${baseUrl}/${showId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const showData = await response.json();
    return showData;
}

export async function deleteShow(showId) {
    const response = await fetch(`${baseUrl}/${showId}`, {
        method: 'DELETE',
        headers: { 'X-Authorization': localStorage.getItem('accessToken') },
    });

    const showData = response.json();
    return showData;
}
