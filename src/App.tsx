import { lazy, Suspense } from "react";
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { Switch } from "react-router-dom";

import { PrivateRoute, PublicRoute } from "./components/Routes";

const Login = lazy(() => import("@pages/login"));
const Home = lazy(() => import("@pages/index"));
const Dashboard = lazy(() => import("@pages/dashboard"));
const ProductDetails = lazy(() => import("@components/Product/ProductDetails"));
const Upload = lazy(() => import("./pages/upload"));

function App() {
  return (
    <Box as="main" py={10} display="flex" alignItems="center">
      <Container maxW="container.lg">
        <Suspense
          fallback={
            <Flex height={"90vh"} justifyContent="center" alignItems={"center"}>
              <Spinner colorScheme={"primary.400"} />
            </Flex>
          }
        >
          <Switch>
            <PublicRoute restricted={false} component={Home} path="/" exact />
            <PrivateRoute component={Dashboard} path="/dashboard" exact />
            <PrivateRoute
              component={ProductDetails}
              path="/product/:id"
              exact
            />
            <PublicRoute
              restricted={true}
              component={Login}
              path="/login"
              exact
            />
            <PrivateRoute component={Upload} path="/upload" exact />
          </Switch>
        </Suspense>
      </Container>
    </Box>
  );
}

export default App;
