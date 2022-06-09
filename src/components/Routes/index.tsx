import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
  const user = localStorage.getItem("user");

  if (user) {
    console.log("Yes, user exist");
  } else {
    console.log("No user");
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const AnonymousRoute = ({ children }: any) => {
  const user = localStorage.getItem("user");

  if (user) {
    console.log("Yes, user exist");
  } else {
    console.log("No user");
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
