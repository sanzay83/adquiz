import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Review.css";

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
    <>
      <Link className="exit" to="/">
        X
      </Link>
      <div className="halfBackground"></div>
      <div className="review-container">
        {selectedQuestions.map((data) => (
          <div key={data.id}>
            <div className="question-text">
              {data.id + ". " + data.question}
            </div>
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
    </>
  );
}

export default Review;
