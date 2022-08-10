import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, Text } from '@chakra-ui/react';
import { unstable_HistoryRouter as Router } from 'react-router-dom';

import { Router as history } from '@utils/index';

import customTheme from '@assets/theme';

const Navbar = lazy(() => import('@components/Navbar'));
const Footer = lazy(() => import('@components/Footer'));
import BackToTop from '@components/BackToTop';
const App = lazy(() => import('./App'));

const container = document.getElementById('app');
const root = createRoot(container!);

import './index.css';

root.render(
  <React.StrictMode>
    <Suspense fallback={<Text>Loading...</Text>}>
      <ChakraProvider theme={customTheme}>
        <Router history={history}>
          <Navbar />
          <App />
          <Footer />
          <BackToTop />
        </Router>
      </ChakraProvider>
    </Suspense>
  </React.StrictMode>
);
