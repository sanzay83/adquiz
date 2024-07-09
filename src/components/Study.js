import React from "react";
import { Link } from "react-router-dom";
import "./styles/Study.css";

function Study() {
  return (
    <>
      <Link className="exit" to="/">
        X
      </Link>
      <div className="menu-container">
        <h1 className="menu-header">Learning Activities</h1>
        <Link to="/quizStudy">
          <button className="menu-button">Study Questions</button>
        </Link>
        <Link to="/writing">
          <button className="menu-button">Practice Writing Vocabulary</button>
        </Link>
        <Link to="/reading">
          <button className="menu-button">Practice Reading Vocabulary</button>
        </Link>
      </div>
    </>
  );
}

export default Study;
