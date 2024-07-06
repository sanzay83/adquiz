import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Result.css";

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
    <>
      <Link className="exit" to="/">
        X
      </Link>
      <div className="halfBackground"></div>
      <div className="trf">
        <img src={require("./background.png")} alt="background" /> <br />
        {score !== null ? `Your score is: ${score}` : "No score available"}
      </div>
      <div className="resultButtonContainer">
        <Link to="/quiz">
          <button className="button">Next Attempt</button>
        </Link>
        <Link to="/review">
          <button className="button">Review</button>
        </Link>
      </div>
    </>
  );
}

export default Result;
