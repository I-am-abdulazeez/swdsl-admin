import { lazy, Suspense } from 'react';
import { Box, Container, Flex, Spinner } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import { AnonymousRoute, PrivateRoute } from '@components/Routes';

const Login = lazy(() => import('@pages/login'));
const Home = lazy(() => import('@pages/index'));
const Dashboard = lazy(() => import('@pages/dashboard'));
const ProductDetails = lazy(() => import('@components/Product/ProductDetails'));
const Upload = lazy(() => import('@pages/upload'));
const Orders = lazy(() => import('@pages/orders'));

const App: React.FC = () => {
  return (
    <Flex as="main" py={10} alignItems={'center'} height={'80vh'}>
      <Suspense
        fallback={
          <Flex
            height={'90vh'}
            width={'100%'}
            justifyContent="center"
            alignItems={'center'}
          >
            <Spinner colorScheme={'primary.400'} />
          </Flex>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AnonymousRoute>
                <Login />
              </AnonymousRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <Upload />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </Flex>
  );
};

export default App;
