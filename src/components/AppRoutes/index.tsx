import { lazy } from 'react';

import { Route, Routes } from 'react-router';

import { PrivateRoute, AnonymousRoute } from '@components/Routes';

const Home = lazy(() => import('@pages/index'));
const Login = lazy(() => import('@pages/login'));
const Dashboard = lazy(() => import('@pages/dashboard'));
const ProductDetails = lazy(() => import('@components/Product/ProductDetails'));
const Upload = lazy(() => import('@pages/upload'));
const Orders = lazy(() => import('@pages/orders'));

const AppRoutes = () => {
  return (
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
  );
};

export default AppRoutes;
