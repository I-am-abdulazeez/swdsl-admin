import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, Text } from "@chakra-ui/react";
import customTheme from "./assets/theme";
import { QueryClient, QueryClientProvider } from "react-query";

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
