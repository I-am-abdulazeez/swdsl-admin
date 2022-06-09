import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, Text } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import customTheme from "@assets/theme";

const Navbar = lazy(() => import("@components/Navbar"));
const Footer = lazy(() => import("@components/Footer"));
const ClientOnly = lazy(() => import("@components/ClientOnly"));

const App = lazy(() => import("./App"));

const queryClient = new QueryClient();

const container = document.getElementById("app");
const root = createRoot(container!);

import "./index.css";

root.render(
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
  </React.StrictMode>
);
