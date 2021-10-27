import { Box, Container } from "@chakra-ui/react";
import { Switch } from "react-router-dom";
import Home from "./pages";
import Dashboard from "./pages/dashboard";
import ProductDetails from "./components/Product/ProductDetails";
import { PrivateRoute, PublicRoute } from "./components/Routes";
import Login from "./pages/login";
import Upload from "./pages/upload";

function App() {
  return (
    <Box as="main" py={10} display="flex" alignItems="center">
      <Container maxW="container.lg">
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <PrivateRoute component={ProductDetails} path="/product/:id" exact />
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
