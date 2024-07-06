import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Quiz() {
  return (
    <div className="Quiz">
      This is Quiz
      <Link className="result" to="/result">
        <button className="buton">Submit</button>
      </Link>
    </div>
  );
}

export default Quiz;
