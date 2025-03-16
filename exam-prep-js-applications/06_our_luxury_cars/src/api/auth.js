const baseUrl = 'http://localhost:3030/users';

export async function register(email, password) {
    const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw response.json();
    }

    const userData = await response.json();
    return userData;
}

export async function login(email, password) {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw response.json();
    }

    const userData = await response.json();
    return userData;
}

export async function logout() {
    return fetch(`${baseUrl}/logout`, {
        headers: { 'X-Authorization': localStorage.getItem('accessToken') },
    }).then(() => {
        localStorage.clear();
    });
}
