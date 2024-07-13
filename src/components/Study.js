import React from "react";
import { Link } from "react-router-dom";
import "../styles/StudyMaterial.css";

function Study() {
  return (
    <>
      <Link className="exit" to="/adquiz">
        <div className="header">
          <button className="close-button">✖</button>
        </div>
      </Link>
      <div className="menu-container">
        <h1 className="menu-header">Learning Activities</h1>
        <Link to="/quizStudy">
          <button className="main-button">Study Questions</button>
        </Link>
        <Link to="/writing">
          <button className="main-button">Writing Vocabulary</button>
        </Link>
        <Link to="/reading">
          <button className="main-button">Reading Vocabulary</button>
        </Link>
      </div>
    </>
  );
}

export default Study;
