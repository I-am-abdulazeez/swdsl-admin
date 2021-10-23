import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

export const PublicRoute = ({
  component: Component,
  restricted,
  ...rest
}: any) => {
  const { isLoggedIn } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
