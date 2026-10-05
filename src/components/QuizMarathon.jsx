import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AllData from "../assets/data.json";
import "../styles/Quiz.css";
import { shuffle, markQuestionCorrect } from "../utils/quiz.js";
import {
  IconX,
  IconCheck,
  IconArrowRight,
  IconFlame,
  IconTarget,
  IconTrophy,
} from "./icons.jsx";

const LETTERS = ["A", "B", "C", "D"];

function QuizMarathon() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null); // option chosen for current question
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setQuestions(
      shuffle(AllData).map((q) => ({ ...q, options: shuffle(q.options) }))
    );
  }, []);

  const q = questions[index];
  const isLast = index === questions.length - 1;

  const choose = (option) => {
    if (picked !== null || !q) return;
    setPicked(option);
    const right = option === q.correct;
    if (right) {
      setCorrectCount((c) => c + 1);
      setStreak((s) => {
        const ns = s + 1;
        setBestStreak((b) => Math.max(b, ns));
        return ns;
      });
      markQuestionCorrect(q.id);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (isLast) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  };

  if (questions.length === 0) {
    return (
      <main className="screen narrow">
        <div className="empty-state card">
          <p>Loading all {AllData.length} questions…</p>
        </div>
      </main>
    );
  }

  /* ---------- Completion screen ---------- */
  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100);
    return (
      <main className="screen narrow">
        <div className="card" style={{ padding: "48px 32px", textAlign: "center" }}>
          <span className="tag gold" style={{ marginBottom: 18 }}>
            Marathon complete
          </span>
          <h1 style={{ fontSize: 30, marginBottom: 8 }}>
            {correctCount} / {questions.length}
          </h1>
          <p style={{ color: "var(--muted)", marginBottom: 26 }}>
            That's {pct}% correct across the full question bank.
          </p>
          <div className="marathon-stats" style={{ marginBottom: 28 }}>
            <div className="marathon-stat">
              <span className="ms-icon green">
                <IconCheck />
              </span>
              <div>
                <strong>{correctCount}</strong>
                <span>Correct</span>
              </div>
            </div>
            <div className="marathon-stat">
              <span className="ms-icon gold">
                <IconFlame />
              </span>
              <div>
                <strong>{bestStreak}</strong>
                <span>Best streak</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              <IconTrophy /> Run it again
            </button>
            <Link to="/" className="btn btn-ghost">
              Back home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ---------- Question screen ---------- */
  const wasRight = picked !== null && picked === q.correct;

  return (
    <main className="screen narrow">
      <div className="quiz-topbar">
        <Link to="/" className="icon-btn" aria-label="Exit marathon">
          <IconX />
        </Link>
        <div className="quiz-meta">
          <span className="tag red">Marathon</span>
          <span className="quiz-count">
            Question {index + 1} of {questions.length}
          </span>
        </div>
      </div>

      <div className="marathon-stats">
        <div className="marathon-stat">
          <span className="ms-icon green">
            <IconCheck />
          </span>
          <div>
            <strong>{correctCount}</strong>
            <span>Correct</span>
          </div>
        </div>
        <div className="marathon-stat">
          <span className="ms-icon gold">
            <IconFlame />
          </span>
          <div>
            <strong>{streak}</strong>
            <span>Streak</span>
          </div>
        </div>
        <div className="marathon-stat">
          <span className="ms-icon navy">
            <IconTarget />
          </span>
          <div>
            <strong>{index + 1}/{questions.length}</strong>
            <span>Progress</span>
          </div>
        </div>
      </div>

      <div className="progress-track quiz-progress">
        <div
          className="progress-fill"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="question-card card" key={q.id}>
        <h2 className="question-text">{q.question}</h2>

        {picked !== null && (
          <div className={`feedback-banner ${wasRight ? "good" : "bad"}`}>
            {wasRight ? <IconCheck /> : <IconX />}
            {wasRight
              ? streak >= 3
                ? `Correct! ${streak} in a row — on fire.`
                : "Correct! Nice one."
              : `Not quite — the answer is "${q.correct}".`}
          </div>
        )}

        <div className="options">
          {q.options.map((option, oi) => {
            const isPicked = picked === option;
            const isCorrect = option === q.correct;
            let cls = "option-btn";
            if (picked !== null) {
              if (isCorrect) cls += " correct";
              else if (isPicked) cls += " wrong";
              else cls += " dimmed";
            }
            return (
              <button
                key={oi}
                className={cls}
                onClick={() => choose(option)}
                disabled={picked !== null}
              >
                <span className="option-letter">{LETTERS[oi]}</span>
                <span className="option-text">{option}</span>
                {picked !== null && (isPicked || isCorrect) && (
                  <span
                    className="option-check"
                    style={
                      isCorrect && !isPicked
                        ? { background: "var(--green-500)" }
                        : undefined
                    }
                  >
                    {isCorrect ? <IconCheck /> : <IconX />}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="quiz-nav" style={{ justifyContent: "flex-end" }}>
        {picked !== null && (
          <button className="btn btn-navy" onClick={next}>
            {isLast ? "See results" : "Next question"} <IconArrowRight />
          </button>
        )}
      </div>
    </main>
  );
}

export default QuizMarathon;
