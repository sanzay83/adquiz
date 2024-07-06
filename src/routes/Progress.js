import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Progress() {
  return (
    <div className="progress">
      <Link className="exit" to="/">
        X
      </Link>
      This is Progess
    </div>
  );
}

export default Progress;
