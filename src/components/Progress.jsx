import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Progress.css";
import { loadJSON } from "../utils/quiz.js";
import AllData from "../assets/data.json";
import {
  IconX,
  IconTarget,
  IconTrophy,
  IconChart,
  IconCheck,
  IconRotate,
  IconArrowRight,
} from "./icons.jsx";

function Progress() {
  const [attempts, setAttempts] = useState([]);
  const [mastered, setMastered] = useState(0);

  const refresh = () => {
    setAttempts(loadJSON("pastAttempts", []));
    setMastered(loadJSON("correctQuestionIds", []).length);
  };

  useEffect(refresh, []);

  const reset = () => {
    if (!window.confirm("Reset all progress? This clears your quiz history and mastered questions.")) return;
    ["pastAttempts", "correctQuestionIds", "quizScore", "selectedAnswers", "selectedQuestions", "flashKnownIds"].forEach((k) => {
      try { localStorage.removeItem(k); } catch { /* ignore */ }
    });
    refresh();
  };

  const best = attempts.reduce((m, a) => Math.max(m, a.score || 0), 0);
  const avg =
    attempts.length > 0
      ? (attempts.reduce((s, a) => s + (a.score || 0), 0) / attempts.length).toFixed(1)
      : null;
  const masteryPct = Math.round((mastered / AllData.length) * 100);

  const stats = [
    { icon: <IconTarget />, label: "Quizzes taken", value: attempts.length, cls: "navy" },
    { icon: <IconTrophy />, label: "Best score", value: attempts.length ? `${best}/10` : "—", cls: "gold" },
    { icon: <IconChart />, label: "Average score", value: avg ? `${avg}/10` : "—", cls: "red" },
    { icon: <IconCheck />, label: "Questions mastered", value: `${mastered}/${AllData.length}`, cls: "green" },
  ];

  return (
    <main className="screen">
      <div className="screen-head">
        <Link to="/" className="icon-btn" aria-label="Back home">
          <IconX />
        </Link>
        <div className="screen-head-text">
          <h1>My Progress</h1>
          <p>Your quiz history and mastery, saved on this device.</p>
        </div>
      </div>

      <div className="progress-stats">
        {stats.map((s) => (
          <div key={s.label} className="pstat card">
            <span className={`pstat-icon ${s.cls}`}>{s.icon}</span>
            <div>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card mastery-card">
        <div className="mastery-head">
          <h3>Question mastery</h3>
          <span className="tag green">{masteryPct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill green" style={{ width: `${masteryPct}%` }} />
        </div>
        <p>
          {mastered} of {AllData.length} questions answered correctly at least
          once. Keep quizzing to fill the bar.
        </p>
      </div>

      <div className="section-head" style={{ marginTop: 30 }}>
        <h2>Recent attempts</h2>
        <p>Your last {attempts.length} practice quizzes.</p>
      </div>

      {attempts.length > 0 ? (
        <div className="attempt-list">
          {attempts.map((a, i) => {
            const total = a.total || 10;
            const pct = Math.round(((a.score || 0) / total) * 100);
            const passed = (a.score || 0) >= 6;
            return (
              <div key={i} className="attempt card">
                <div className="attempt-top">
                  <span className={`attempt-badge ${passed ? "pass" : "fail"}`}>
                    {passed ? "Passed" : "Practice"}
                  </span>
                  <span className="attempt-date">{a.date}</span>
                </div>
                <div className="attempt-score-row">
                  <strong>
                    {a.score}
                    <span>/{total}</span>
                  </strong>
                  <div className="progress-track attempt-bar">
                    <div
                      className={`progress-fill ${passed ? "green" : "red"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="attempt-pct">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state card">
          <span className="empty-icon">
            <IconChart />
          </span>
          <h3>No attempts yet</h3>
          <p>Take your first practice quiz and your history will appear here.</p>
          <br />
          <Link to="/quiz" className="btn btn-primary">
            Start a quiz <IconArrowRight />
          </Link>
        </div>
      )}

      {attempts.length > 0 && (
        <div className="progress-foot">
          <button className="btn btn-ghost btn-sm" onClick={reset}>
            <IconRotate /> Reset all progress
          </button>
        </div>
      )}
    </main>
  );
}

export default Progress;
