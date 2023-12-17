import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainRouter from "./routers/MainRouter";
import Container from "./components/Container";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import theme from "./Theme/index"; // Import your custom theme
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./providers/userProvider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <CssBaseline />
        <Container>
          <MainRouter />
          <ToastContainer />
        </Container>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
