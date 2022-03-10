import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
  const user = localStorage.getItem("user");

  if (user) {
    console.log("Yes, user exist");
  } else {
    console.log("No user");
  }

  if (!user) {
    return <Navigate to="/login" />;
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
    return <Navigate to="/dashboard" />;
  }

  return children;
};
