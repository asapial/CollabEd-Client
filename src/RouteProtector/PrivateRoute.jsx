// components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../main";
import Loading from "../pages/Others/Loading";


const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to={'/login'} state={location.pathname}></Navigate>
  }

  // If role is required and doesn't match, redirect
  if (requiredRole && user.userRole !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
