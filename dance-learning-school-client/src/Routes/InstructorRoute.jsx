import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../components/hooks/useAuth";
import useRole from "../components/hooks/useRole";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useRole();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && isAdmin.role === "instructor") {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
