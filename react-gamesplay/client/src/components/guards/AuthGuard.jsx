import { Navigate } from 'react-router';
import useAuthorization from '../../hooks/useAuth.js';

export default function AuthGuard({ children }) {
    const { isAuthenticated } = useAuthorization();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}
