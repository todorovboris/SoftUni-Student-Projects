import { UserContext } from '../../contexts/UserContext.js';
import usePersistedState from '../../hooks/usePersistedState.js';

export function UserProvider({ children }) {
    const [authData, setAuthData] = usePersistedState('auth', {});

    const userLoginHandler = (userData) => {
        setAuthData(userData);
    };

    const userLogoutHandler = () => {
        setAuthData({});
    };

    return <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>{children}</UserContext.Provider>;
}
