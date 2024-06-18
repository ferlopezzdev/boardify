import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  canActivate,
  redirectPath = '/auth/signin'
}) => {
  if (!canActivate) {
    return <Navigate to={redirectPath}  replace/>
  }
  return <Outlet />
}

export default ProtectedRoute;