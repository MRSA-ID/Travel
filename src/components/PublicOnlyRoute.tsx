import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux-hooks";

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const { user, token } = useAppSelector((state) => state.auth);

  if (user && token) {
    // Jika sudah login, redirect ke landing
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
