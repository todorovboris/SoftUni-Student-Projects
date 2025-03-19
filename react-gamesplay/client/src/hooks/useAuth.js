import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext.js';

export default function useAuthorization() {
    const { accessToken } = useContext(UserContext);

    const options = {
        headers: {
            'X-Authorization': accessToken,
        },
    };

    return { accessToken, options };
}
