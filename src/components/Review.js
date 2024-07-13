import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Review.css";

function Review() {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    // Retrieve the selected questions and answers from localStorage
    const storedQuestions = JSON.parse(
      localStorage.getItem("selectedQuestions")
    );
    const storedAnswers = JSON.parse(localStorage.getItem("selectedAnswers"));

    if (storedQuestions) {
      setSelectedQuestions(storedQuestions);
    }
    if (storedAnswers) {
      setSelectedAnswers(storedAnswers);
    }
  }, []);

  return (
    <div className="app">
      <Link className="exit" to="/">
        <div className="header">
          <button className="close-button">✖</button>
        </div>
      </Link>

      <div className="review-container">
        {selectedQuestions.map((data) => (
          <div className="opt" key={data.id}>
            <br />
            <div className="question-text">{data.question}</div>
            {data.options.map((option, index) => {
              const isCorrect = option === data.correct;
              const isSelected = option === selectedAnswers[data.id];
              return (
                <div
                  key={index}
                  className="option"
                  style={{
                    backgroundColor: isSelected
                      ? isCorrect
                        ? "green"
                        : "red"
                      : "transparent",
                    color: isSelected ? "white" : "black",
                  }}
                >
                  {option}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
