import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { logout } from "@/store/slices/authSlices";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear redux state
    dispatch(logout());

    // Redirect ke login
    navigate("/login");
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
