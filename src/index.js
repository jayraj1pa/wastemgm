import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import ContextShare from "./service/ContextShare";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <ContextShare>
      <App />
    </ContextShare>
  </ChakraProvider>
);
