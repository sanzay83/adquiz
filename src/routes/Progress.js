import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Progress() {
  return (
    <div className="progress">
      This is Progess
      <Link to="/">
        <button className="buton">Close Button</button>
      </Link>
    </div>
  );
}

export default Progress;
