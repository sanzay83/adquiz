import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Progress.css";
import "../styles/App.css";

function Progress() {
  const [pastAttempts, setPastAttempts] = useState([]);

  useEffect(() => {
    // Retrieve past attempts from localStorage
    const attempts = JSON.parse(localStorage.getItem("pastAttempts")) || [];
    setPastAttempts(attempts);
  }, []);

  return (
    <div className="app">
      <Link className="exit" to="/">
        <div className="header">
          <button className="close-button">✖</button>
        </div>
      </Link>

      <h1>Progress</h1>
      <div className="attempts">
        {pastAttempts.length > 0 ? (
          pastAttempts.map((attempt, index) => (
            <div key={index} className="attempt">
              <p>Attempt {index + 1}:</p>
              <p>Score: {attempt.score} / 10</p>
              <p>Date: {attempt.date}</p>
            </div>
          ))
        ) : (
          <p>No attempts recorded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Progress;
