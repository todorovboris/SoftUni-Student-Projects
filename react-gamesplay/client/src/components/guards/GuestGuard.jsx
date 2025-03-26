import { Navigate, Outlet } from 'react-router';
import useAuthorization from '../../hooks/useAuth.js';

export default function GuestGuard() {
    const { isAuthenticated } = useAuthorization();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
