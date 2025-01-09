const baseUrl = 'http://localhost:3030/users';

async function login(email, password) {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (data.code >= 400) {
        return alert(data.message);
    }

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('email', data.email);
    localStorage.setItem('_id', data._id);

    return data;
}

async function register(email, password) {
    const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    const data = await response.json();

    if (data.code >= 400) {
        return alert(data.message);
    }

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('email', data.email);
    localStorage.setItem('_id', data._id);

    return data;
}

function logout(token) {
    return fetch(`${baseUrl}/logout`, {
        headers: { 'X-Authorization': token },
    }).then(() => {
        localStorage.clear();
    });
}

const auth = {
    login,
    register,
    logout,
};

export default auth;
