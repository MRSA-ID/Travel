import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux-hooks";
import { Toaster } from "react-hot-toast";

interface PublicOnlyRouteProps {
  children: React.ReactNode;
}

const PublicOnlyRoute = ({ children }: PublicOnlyRouteProps) => {
  const { user, token } = useAppSelector((state) => state.auth);

  if (user && token) {
    // Jika sudah login, redirect ke landing
    return <Navigate to="/" replace />;
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

export default PublicOnlyRoute;
