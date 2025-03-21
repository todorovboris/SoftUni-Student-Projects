import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext.js';
import request from '../utils/request.js';

export default function useAuthorization() {
    const authData = useContext(UserContext);

    const requestWrapper = (method, url, data, options = {}) => {
        const optionWrapper = {
            ...options,
            headers: {
                'X-Authorization': authData.accessToken,
                ...options.headers,
            },
        };

        return request.baseRequest(method, url, data, optionWrapper);
    };

    return {
        ...authData,
        request: {
            get: (url, options) => requestWrapper('GET', url, null, options),
            post: (url, data, options) => requestWrapper('POST', url, data, options),
            put: (url, data, options) => requestWrapper('PUT', url, data, options),
            delete: (url, options) => requestWrapper('DELETE', url, null, options),
        },
    };
}

// import { useContext } from 'react';
// import { UserContext } from '../contexts/UserContext.js';

// export default function useAuthorization() {
//     const { accessToken } = useContext(UserContext);

//     const options = {
//         headers: {
//             'X-Authorization': accessToken,
//         },
//     };

//     return { accessToken, options };
// }
