import { useContext, useEffect, useRef } from 'react';
import request from '../utils/request.js';
import { UserContext } from '../contexts/UserContext.js';

const baseUrl = 'http://localhost:3030/users';

//* hook on event
export const useLogin = () => {
    const abortRef = useRef(new AbortController());

    const login = async (email, password) => {
        return request.post(`${baseUrl}/login`, { email, password }, { signal: abortRef.current.signal });
    };

    useEffect(() => {
        return () => abortRef.current.abort();
    }, []);

    return { login };
};

//* hook on event
export const useRegister = () => {
    const register = (email, password) => {
        return request.post(`${baseUrl}/register`, { email, password });
    };

    return { register };
};

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);

    useEffect(() => {
        if (!accessToken) return;

        const options = {
            headers: {
                'X-Authorization': accessToken,
            },
        };

        request.get(`${baseUrl}/logout`, options).then(userLogoutHandler);
    }, [accessToken, userLogoutHandler]);

    return {
        isLoggedOut: !!accessToken,
    };
};
