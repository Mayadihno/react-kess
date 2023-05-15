import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import ScrollTop from "./Components/ScrolTop.jsx/ScrollTop.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollTop>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ScrollTop>
    </BrowserRouter>
  </React.StrictMode>
);
