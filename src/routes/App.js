import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Home />
      <Outlet />
    </div>
  );
}

export default App;
