import { Box, Container } from "@chakra-ui/react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components/Routes";
import Home from "./pages";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Upload from "./pages/upload";

function App() {
  return (
    <Box h="78vh" as="main" mt={3} display="flex" alignItems="center">
      <Container maxW="container.lg">
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <PublicRoute
            restricted={true}
            component={Login}
            path="/login"
            exact
          />
          <PrivateRoute component={Upload} path="/upload" exact />
        </Switch>
      </Container>
    </Box>
  );
}

export default App;
