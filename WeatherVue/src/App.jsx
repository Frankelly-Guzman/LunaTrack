import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <Header></Header>
        <Navbar></Navbar>
      </div>
    </>
  );
}

export default App;
