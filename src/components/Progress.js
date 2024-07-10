import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Progress.css";

function Progress() {
  const [pastAttempts, setPastAttempts] = useState([]);

  useEffect(() => {
    // Retrieve past attempts from localStorage
    const attempts = JSON.parse(localStorage.getItem("pastAttempts")) || [];
    setPastAttempts(attempts);
  }, []);

  return (
    <div className="progress">
      <Link className="exit" to="/">
        X
      </Link>
      <h2>Progress</h2>
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
