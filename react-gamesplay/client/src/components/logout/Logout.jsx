import { Navigate } from 'react-router';
import { useLogout } from '../../api/authApi.js';

export default function Logout() {
    const { isLoggedOut } = useLogout();

    return isLoggedOut ? <Navigate to="/" /> : null; //! could use spinner for else condition
}
