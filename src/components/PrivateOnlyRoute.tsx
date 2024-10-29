import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux-hooks";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateOnlyRoute = ({ children }: PrivateRouteProps) => {
  const { token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    // Redirect ke login dengan menyimpan intended location
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateOnlyRoute;
