import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Result.css";

function Result() {
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Retrieve the score from localStorage
    const storedScore = localStorage.getItem("quizScore");
    if (storedScore !== null) {
      setScore(storedScore);
    }
  }, []);

  return (
    <div className="app">
      <div className="resultContainer">
        <Link className="exit" to="/adquiz">
          <div className="header">
            <button className="close-button">✖</button>
          </div>
        </Link>
        <div className="halfBackground"></div>
        <div className="trf">
          {score < 6 ? (
            <img src={require("../assets/tryagain.png")} alt="TryAgainEmoji" />
          ) : (
            <img src={require("../assets/trophy.png")} alt="Trophy" />
          )}
          <br />
        </div>
        <div className="resultScore">
          {score !== null ? `${score}/10` : "No score available"}
          <br />
          {score < 6
            ? `Try again to Score Better`
            : `Congratulation you passed`}
        </div>

        <Link to="/quiz">
          <button className="main-button">Next Attempt</button>
        </Link>
        <Link to="/review">
          <button className="main-button">Review</button>
        </Link>
      </div>
    </div>
  );
}

export default Result;
