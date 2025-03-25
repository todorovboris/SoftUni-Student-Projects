import { useContext } from 'react';
import { UserContext, useUserContext } from '../contexts/UserContext.js';
import request from '../utils/request.js';

export default function useAuthorization() {
    const authData = useUserContext();

    const requestWrapper = (method, url, data, options = {}) => {
        const authOptions = {
            ...options,
            headers: {
                'X-Authorization': authData.accessToken,
                ...options.headers,
            },
        };

        return request.baseRequest(method, url, data, authData.accessToken ? authOptions : options);
    };

    return {
        ...authData,
        isAuthenticated: !!authData.accessToken,
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
