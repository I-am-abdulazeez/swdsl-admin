import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, Text } from '@chakra-ui/react';
import { unstable_HistoryRouter as Router } from 'react-router-dom';

import { Router as history } from '@utils/index';

import customTheme from '@assets/theme';
import QueryClientWrapper from './client';

const Navbar = lazy(() => import('@components/Navbar'));
const Footer = lazy(() => import('@components/Footer'));
const App = lazy(() => import('./App'));

const container = document.getElementById('app');
const root = createRoot(container!);

import './index.css';
import BackToTop from '@components/BackToTop';

root.render(
  <React.StrictMode>
    <Suspense fallback={<Text>Loading...</Text>}>
      <QueryClientWrapper>
        <ChakraProvider theme={customTheme}>
          <Router history={history}>
            <Navbar />
            <App />
            <Footer />
            <BackToTop />
          </Router>
        </ChakraProvider>
      </QueryClientWrapper>
    </Suspense>
  </React.StrictMode>
);
