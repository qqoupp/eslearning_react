import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainRouter from "./routers/MainRouter";
import Container from "./components/Container";
import { ThemeProvider } from "@mui/material/styles"; // Import ThemeProvider
import theme from "./Theme/index"; // Import your custom theme
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <MainRouter />
      </Container>
    </ThemeProvider>
  );
}

export default App;
