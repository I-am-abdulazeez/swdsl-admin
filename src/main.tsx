import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import customTheme from "./assets/theme";
import ClientOnly from "./components/ClientOnly";
import "./index.css";

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
