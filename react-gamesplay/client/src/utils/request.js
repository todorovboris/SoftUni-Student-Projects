const request = async (method, url, data = null, options = {}) => {
    const configOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    if (data) {
        configOptions.body = JSON.stringify(data);
    }

    try {
        //
    } catch (err) {
        //
    }

    const response = await fetch(url, configOptions);
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
};

// const api = {
//     get: (url, options) => request('GET', url, null, options),
//     post: (url, data, options) => request('POST', url, data, options),
//     put: (url, data, options) => request('PUT', url, data, options),
//     delete: (url, options) => request('DELETE', url, null, options),
// };

// const request = async (method, url, data, options = {}) => {
//     if (method != 'GET') {
//         options.method = method;
//     }

//     if (data) {
//         options = {
//             ...options,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         };
//     }

//     const response = await fetch(url, options);
//     const result = await response.json();
//     return result;
// };

// export default {
//     get: request.bind(null, 'GET'),
//     post: request.bind(null, 'POST'),
//     put: request.bind(null, 'PUT'),
//     delete: request.bind(null, 'DELETE'),
// };
