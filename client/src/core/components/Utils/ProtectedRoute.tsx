import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({
    canActivate = false,
    redirectPath = '/auth/signin',
}) => {

    // Acceder al contexto del usuario autenticado
    const { token } = useAuth();

    canActivate = !!token; // canActivate es true si el token está presente

    if (!canActivate) {
        return <Navigate to={redirectPath} replace />
    }

    return <Outlet />;
    
}

export default ProtectedRoute;