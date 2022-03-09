import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
  const user = localStorage.getItem("user");
  const location = useLocation();

  if (user) {
    console.log("Yes, user exist");
  } else {
    console.log("No user");
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};
