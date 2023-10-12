/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home"; 
import Consolas from "./Pages/Consolas";

function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/consola" element={<Consolas />} /> 
       
      </Routes>
    </Router>
  );
}

export default App;