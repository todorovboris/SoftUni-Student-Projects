import request from '../utils/request.js';

const baseUrl = 'http://localhost:3030/users';

//* hook on event
export const useLogin = () => {
    const login = async (email, password) => {
        const result = await request.post(`${baseUrl}/login`, { email, password });

        return result;
    };

    return { login };
};
