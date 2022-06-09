import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, Text } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

import customTheme from "@assets/theme";
import QueryClientWrapper from "./client";

const Navbar = lazy(() => import("@components/Navbar"));
const Footer = lazy(() => import("@components/Footer"));
const ClientOnly = lazy(() => import("@components/ClientOnly"));

const App = lazy(() => import("./App"));

const container = document.getElementById("app");
const root = createRoot(container!);

import "./index.css";

root.render(
  <React.StrictMode>
    <Suspense fallback={<Text>Loading...</Text>}>
      <ClientOnly>
        <QueryClientWrapper>
          <ChakraProvider theme={customTheme}>
            <Router>
              <Navbar />
              <App />
              <Footer />
            </Router>
          </ChakraProvider>
        </QueryClientWrapper>
      </ClientOnly>
    </Suspense>
  </React.StrictMode>
);
