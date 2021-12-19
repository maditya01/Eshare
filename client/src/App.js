import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@material-ui/core";

import NavBar from "./components/NavBar/NavBar.js";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";

//This is our Top most App(root) Component.
const App = () => {


  return (
    <BrowserRouter>
    <Container maxWidth="lg">
        <NavBar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
      </BrowserRouter>
  );
};

export default App;
