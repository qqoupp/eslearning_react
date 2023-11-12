import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MainRouter from "./routers/MainRouter";
import Container from "./components/Container";

function App() {
  return (
    <Container>
      <MainRouter />
    </Container>
  );
}

export default App;
