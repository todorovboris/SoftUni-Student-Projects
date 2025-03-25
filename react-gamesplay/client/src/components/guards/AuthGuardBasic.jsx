import { Navigate } from 'react-router';
import useAuthorization from '../../hooks/useAuth.js';

export default function AuthGuardBasic({ children }) {
    const { isAuthenticated } = useAuthorization();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}
