import React from "react";
import "../styles/Home.css";
import { Link, Outlet } from "react-router-dom";
import AmericanFlag from "../assets/american-flag.png";
function Home() {
  return (
    <div className="Home">
      <div className="glassify">
        <img src={AmericanFlag} alt="American Flag" className="flag" />
        <h1>American Dream Quiz </h1>
        <Link to="/study">
          <button className="main-button">Study Material</button>
        </Link>
        <Link to="/flashcard">
          <button className="main-button">Flashcards</button>
        </Link>
        <Link to="/quiz">
          <button className="secondary-button">Start Quiz</button>
        </Link>
        <Link to="/quizmarathon">
          <button className="secondary-button">Quiz Marathon</button>
        </Link>
        <Link to="/progress">
          <button className="secondary-button">Progress</button>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
