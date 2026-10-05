import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import AllData from "../assets/data.json";
import "../styles/Quiz.css";
import { pickRandomQuestions, loadJSON, saveJSON, recordAttempt } from "../utils/quiz.js";
import { IconArrowLeft, IconArrowRight, IconX, IconCheck } from "./icons.jsx";

const TOTAL = 10;
const LETTERS = ["A", "B", "C", "D"];

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [warn, setWarn] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const mastered = loadJSON("correctQuestionIds", []);
    let pool = AllData.filter((q) => !mastered.includes(q.id));
    if (pool.length < TOTAL) pool = AllData; // fall back to everything if nearly mastered
    setQuestions(pickRandomQuestions(pool, Math.min(TOTAL, pool.length)));
  }, []);

  const goTo = (i) => {
    setWarn(false);
    setIndex(i);
  };

  const q = questions[index];
  const answeredCount = Object.keys(answers).length;

  const select = (option) => {
    if (!q) return;
    setAnswers((prev) => ({ ...prev, [q.id]: option }));
    setWarn(false);
  };

  const finish = () => {
    const unanswered = questions.filter((qq) => !(qq.id in answers));
    if (unanswered.length > 0) {
      setWarn(true);
      cardRef.current?.classList.remove("shake");
      void cardRef.current?.offsetWidth; // restart animation
      cardRef.current?.classList.add("shake");
      return;
    }

    const newCorrect = questions
      .filter((qq) => answers[qq.id] === qq.correct)
      .map((qq) => qq.id);

    const ids = loadJSON("correctQuestionIds", []);
    const merged = Array.from(new Set([...ids, ...newCorrect]));
    saveJSON("correctQuestionIds", merged.length >= 90 ? [] : merged);

    const score = newCorrect.length;
    saveJSON("quizScore", score);
    saveJSON("selectedAnswers", answers);
    saveJSON("selectedQuestions", questions);
    recordAttempt(score, questions.length);

    navigate("/result");
  };

  if (questions.length === 0) {
    return (
      <main className="screen narrow">
        <div className="empty-state card">
          <p>Preparing your quiz…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="screen narrow">
      <div className="quiz-topbar">
        <Link to="/" className="icon-btn" aria-label="Exit quiz">
          <IconX />
        </Link>
        <div className="quiz-meta">
          <span className="tag">Practice quiz</span>
          <span className="quiz-count">
            Question {index + 1} of {questions.length}
          </span>
        </div>
        <span className="quiz-answered">{answeredCount}/{questions.length} answered</span>
      </div>

      <div className="progress-track quiz-progress">
        <div
          className="progress-fill red"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="question-dots">
        {questions.map((qq, i) => (
          <button
            key={qq.id}
            className={
              "dot" +
              (i === index ? " current" : "") +
              (qq.id in answers ? " answered" : "")
            }
            onClick={() => goTo(i)}
            aria-label={`Go to question ${i + 1}`}
          />
        ))}
      </div>

      <div className="question-card card" ref={cardRef} key={q.id}>
        <h2 className="question-text">{q.question}</h2>
        {warn && (
          <p className="warn-text">
            Answer every question before finishing — {questions.length - answeredCount} left.
          </p>
        )}
        <div className="options">
          {q.options.map((option, oi) => {
            const selected = answers[q.id] === option;
            return (
              <button
                key={oi}
                className={"option-btn" + (selected ? " selected" : "")}
                onClick={() => select(option)}
              >
                <span className="option-letter">{LETTERS[oi]}</span>
                <span className="option-text">{option}</span>
                {selected && (
                  <span className="option-check">
                    <IconCheck />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="quiz-nav">
        <button
          className="btn btn-ghost"
          onClick={() => goTo(Math.max(0, index - 1))}
          disabled={index === 0}
        >
          <IconArrowLeft /> Prev
        </button>
        {index < questions.length - 1 ? (
          <button className="btn btn-navy" onClick={() => goTo(index + 1)}>
            Next <IconArrowRight />
          </button>
        ) : (
          <button className="btn btn-primary" onClick={finish}>
            Finish quiz <IconCheck />
          </button>
        )}
      </div>
    </main>
  );
}

export default Quiz;
