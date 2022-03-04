import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/system";
import theme from "./config/mui-theme";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
