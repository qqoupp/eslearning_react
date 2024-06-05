import React, { useEffect } from "react";
import backgroundImage from "./components/Images/background.svg";
import "./App.css";
import MainRouter from "./routers/MainRouter";
import { ThemeProvider, CssBaseline} from "@mui/material";
import theme from "./Theme/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "./providers/userProvider";
import Container from "./components/Container";


function App() {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundAttachment = '';
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <UserProvider>
        <Container>
          <MainRouter />
        </Container>
        <ToastContainer />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
