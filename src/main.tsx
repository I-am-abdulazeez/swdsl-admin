import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import customTheme from "./assets/theme";
import ClientOnly from "./components/ClientOnly";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById("root")
);
