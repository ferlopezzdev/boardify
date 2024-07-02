import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import isValidToken from "../../utils/isValidToken";

interface ProtectedRouteProps {
  canActivate?: boolean;
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  canActivate = false,
  redirectPath = '/auth/signin',
}) => {
  // Acceder al contexto del usuario autenticado
  const { token } = useAuth();

  // Validar si el token es válido
  canActivate = token ? isValidToken(token) : false;

  if (!canActivate) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
