const request = async (method, url, data = null, options = {}) => {
    const updatedOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    if (data) {
        updatedOptions.body = JSON.stringify(data);
    }

    const response = await fetch(url, updatedOptions);
    const responseContentType = response.headers.get('Content-Type');

    if (!responseContentType) return;

    const result = await response.json();
    return result;
};

export default {
    get: (url, options) => request('GET', url, null, options),
    post: (url, data, options) => request('POST', url, data, options),
    put: (url, data, options) => request('PUT', url, data, options),
    delete: (url, options) => request('DELETE', url, null, options),
    baseRequest: request,
};
