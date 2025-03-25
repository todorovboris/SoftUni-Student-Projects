import { Navigate, Outlet } from 'react-router';
import useAuthorization from '../../hooks/useAuth.js';

export default function AuthGuard() {
    const { isAuthenticated } = useAuthorization();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
