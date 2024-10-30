import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux-hooks";
import { Toaster } from "react-hot-toast";

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

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "#4ade80",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#f87171",
              color: "#fff",
            },
          },
        }}
      />
      {children}
    </>
  );
};

export default PrivateOnlyRoute;
