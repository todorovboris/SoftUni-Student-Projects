export const request = async (method, url, data) => {
    const accessToken = localStorage.getItem('accessToken');
    let requestOptions = {};

    if (data) {
        requestOptions.headers = {
            'Content-Type': 'application/json',
        };

        requestOptions.body = JSON.stringify(data);
    }

    if (accessToken) {
        requestOptions.headers = {
            ...requestOptions.headers,
            'X-Authorization': accessToken,
        };
    }

    if (method !== 'GET') {
        requestOptions.method = method;
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        throw response.json();
    }

    const result = await response.json();

    return result;
};
