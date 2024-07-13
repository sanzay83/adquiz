import React from "react";

import { Outlet } from "react-router-dom";
import Home from "./Home";

import "../styles/App.css";

function App() {
  return (
    <div className="app">
      <Home />
      <Outlet />
    </div>
  );
}

export default App;
