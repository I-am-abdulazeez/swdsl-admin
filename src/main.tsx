import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, Text } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import customTheme from "@assets/theme";

const Navbar = lazy(() => import("@components/Navbar"));
const Footer = lazy(() => import("@components/Footer"));
const ClientOnly = lazy(() => import("@components/ClientOnly"));

const App = lazy(() => import("./App"));

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Text>Loading...</Text>}>
      <ClientOnly>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={customTheme}>
            <Router>
              <Navbar />
              <App />
              <Footer />
            </Router>
          </ChakraProvider>
        </QueryClientProvider>
      </ClientOnly>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
