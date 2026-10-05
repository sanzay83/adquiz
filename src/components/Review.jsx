import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Review.css";
import { loadJSON } from "../utils/quiz.js";
import { IconX, IconCheck, IconRotate } from "./icons.jsx";

function Review() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    setQuestions(loadJSON("selectedQuestions", []));
    setAnswers(loadJSON("selectedAnswers", {}));
  }, []);

  const correctCount = questions.filter((q) => answers[q.id] === q.correct).length;

  if (questions.length === 0) {
    return (
      <main className="screen narrow">
        <div className="empty-state card">
          <h3>Nothing to review</h3>
          <p>Finish a practice quiz and your answers will show up here.</p>
          <br />
          <Link to="/quiz" className="btn btn-primary">
            Start a quiz
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="screen narrow">
      <div className="screen-head">
        <Link to="/result" className="icon-btn" aria-label="Back to result">
          <IconX />
        </Link>
        <div className="screen-head-text">
          <h1>Answer Review</h1>
          <p>
            You got <strong>{correctCount} of {questions.length}</strong> right — green is
            correct, red is where you went wrong.
          </p>
        </div>
      </div>

      <div className="review-list">
        {questions.map((q, qi) => {
          const userAnswer = answers[q.id];
          const gotRight = userAnswer === q.correct;
          return (
            <div key={q.id} className="review-item card">
              <div className="review-item-head">
                <span className={`review-verdict ${gotRight ? "right" : "wrong"}`}>
                  {gotRight ? <IconCheck /> : <IconX />}
                </span>
                <h3>
                  <span className="review-num">Q{qi + 1}.</span> {q.question}
                </h3>
              </div>
              <div className="review-options">
                {q.options.map((opt, oi) => {
                  const isCorrect = opt === q.correct;
                  const isUser = opt === userAnswer;
                  let cls = "review-option";
                  if (isCorrect) cls += " is-correct";
                  else if (isUser) cls += " is-wrong";
                  return (
                    <div key={oi} className={cls}>
                      <span className="ro-text">{opt}</span>
                      {isCorrect && <span className="ro-tag correct">Correct answer</span>}
                      {isUser && !isCorrect && <span className="ro-tag yours">Your answer</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="review-foot">
        <Link to="/quiz" className="btn btn-primary">
          <IconRotate /> Try another quiz
        </Link>
      </div>
    </main>
  );
}

export default Review;
