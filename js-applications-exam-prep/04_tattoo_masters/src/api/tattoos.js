const baseUrl = 'http://localhost:3030/data/tattoos';

export async function getAll() {
    const response = await fetch(`${baseUrl}?sortBy=_createdOn%20desc`);
    const tattoos = await response.json();

    return tattoos;
}

export async function getOne(tattooId) {
    const response = await fetch(`${baseUrl}/${tattooId}`);
    const tattoo = await response.json();

    return tattoo;
}

export async function createTattoo(tattoosData) {
    const response = await fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(tattoosData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const tattooData = await response.json();
    return tattooData;
}

export async function editTattoo(tattooId, tattooData) {
    const response = await fetch(`${baseUrl}/${tattooId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(tattooData),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const editData = await response.json();
    return editData;
}

export async function deleteTattoo(tattooId) {
    const response = await fetch(`${baseUrl}/${tattooId}`, {
        method: 'DELETE',
        headers: { 'X-Authorization': localStorage.getItem('accessToken') },
    });

    const tattooData = await response.json();
    return tattooData;
}
