import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Result.css";
import { loadJSON } from "../utils/quiz.js";
import { IconX, IconRotate, IconEye, IconTrophy, IconArrowRight } from "./icons.jsx";

const PASS_MARK = 6;

function Result() {
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(10);

  useEffect(() => {
    const s = loadJSON("quizScore", null);
    const qs = loadJSON("selectedQuestions", []);
    setScore(s);
    if (qs.length > 0) setTotal(qs.length);
  }, []);

  if (score === null) {
    return (
      <main className="screen narrow">
        <div className="empty-state card">
          <h3>No result yet</h3>
          <p>Take a quiz first, then come back to see your score.</p>
          <br />
          <Link to="/quiz" className="btn btn-primary">
            Start a quiz
          </Link>
        </div>
      </main>
    );
  }

  const passed = score >= PASS_MARK;
  const pct = Math.round((score / total) * 100);
  const C = 2 * Math.PI * 64;

  return (
    <main className="screen narrow">
      <div className="result-card card">
        <Link to="/" className="icon-btn result-exit" aria-label="Back home">
          <IconX />
        </Link>

        <div className={`result-badge ${passed ? "pass" : "fail"}`}>
          {passed ? <IconTrophy /> : <IconRotate />}
        </div>

        <h1>{passed ? "You passed!" : "Keep practicing"}</h1>
        <p className="result-sub">
          {passed
            ? "That's a passing score on a real civics test. Well done!"
            : `You need ${PASS_MARK} out of ${total} to pass — review your answers and try again.`}
        </p>

        <div className="result-ring">
          <svg viewBox="0 0 150 150">
            <circle cx="75" cy="75" r="64" className="rr-bg" />
            <circle
              cx="75"
              cy="75"
              r="64"
              className={`rr-fg ${passed ? "pass" : "fail"}`}
              strokeDasharray={`${(pct / 100) * C} ${C}`}
            />
          </svg>
          <div className="rr-label">
            <strong>
              {score}
              <span>/{total}</span>
            </strong>
            <em>{pct}%</em>
          </div>
        </div>

        <div className="result-actions">
          <Link to="/review" className="btn btn-navy">
            <IconEye /> Review answers
          </Link>
          <Link to="/quiz" className="btn btn-primary">
            <IconRotate /> Try again
          </Link>
          <Link to="/" className="btn btn-ghost">
            Home <IconArrowRight />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Result;
