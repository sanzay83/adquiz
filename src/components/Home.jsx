import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { loadJSON } from "../utils/quiz.js";
import {
  IconTarget,
  IconFlame,
  IconCards,
  IconBook,
  IconChart,
  IconArrowRight,
  IconTrophy,
  IconCheck,
} from "./icons.jsx";
import AllData from "../assets/data.json";

const modes = [
  {
    to: "/quiz",
    icon: <IconTarget />,
    title: "Practice Quiz",
    desc: "10 random questions, just like the real test. Score 6+ to pass.",
    accent: "red",
    cta: "Start quiz",
  },
  {
    to: "/quizmarathon",
    icon: <IconFlame />,
    title: "Quiz Marathon",
    desc: `All ${AllData.length} questions back-to-back with instant feedback. Build a streak.`,
    accent: "gold",
    cta: "Go marathon",
  },
  {
    to: "/flashcard",
    icon: <IconCards />,
    title: "Flashcards",
    desc: "Flip through all 128 civics Q&As. Mark what you know, drill the rest.",
    accent: "navy",
    cta: "Flip cards",
  },
  {
    to: "/study",
    icon: <IconBook />,
    title: "Study Material",
    desc: "Browse civics questions plus reading & writing vocabulary, with search.",
    accent: "navy",
    cta: "Study now",
  },
  {
    to: "/progress",
    icon: <IconChart />,
    title: "My Progress",
    desc: "Track attempts, best scores and how many questions you've mastered.",
    accent: "gold",
    cta: "View progress",
  },
];

function Home() {
  const stats = useMemo(() => {
    const mastered = loadJSON("correctQuestionIds", []).length;
    const attempts = loadJSON("pastAttempts", []);
    const best = attempts.reduce((m, a) => Math.max(m, a.score || 0), 0);
    return {
      mastered,
      total: AllData.length,
      attempts: attempts.length,
      best,
    };
  }, []);

  const pct = Math.round((stats.mastered / stats.total) * 100);

  return (
    <main className="screen home-screen">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="tag gold hero-eyebrow">U.S. Citizenship Test Prep</span>
          <h1>
            Your American Dream,
            <br />
            <span className="hero-accent">one question at a time.</span>
          </h1>
          <p className="hero-sub">
            Practice the official civics questions, drill flashcards and track
            your mastery — free, offline-friendly, and always in your pocket.
          </p>
          <div className="hero-actions">
            <Link to="/quiz" className="btn btn-primary">
              Start practice quiz <IconArrowRight />
            </Link>
            <Link to="/study" className="btn btn-ghost">
              Browse study material
            </Link>
          </div>
        </div>
        <div className="hero-mastery">
          <div className="mastery-ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" className="ring-bg" />
              <circle
                cx="60"
                cy="60"
                r="52"
                className="ring-fg"
                strokeDasharray={`${(pct / 100) * 326.7} 326.7`}
              />
            </svg>
            <div className="ring-label">
              <strong>{pct}%</strong>
              <span>mastered</span>
            </div>
          </div>
          <p className="mastery-caption">
            {stats.mastered} of {stats.total} questions answered correctly at
            least once
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="stat-row">
        <div className="stat">
          <span className="stat-icon red">
            <IconCheck />
          </span>
          <div>
            <strong>{stats.mastered}</strong>
            <span>Questions mastered</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon navy">
            <IconTarget />
          </span>
          <div>
            <strong>{stats.attempts}</strong>
            <span>Quizzes taken</span>
          </div>
        </div>
        <div className="stat">
          <span className="stat-icon gold">
            <IconTrophy />
          </span>
          <div>
            <strong>{stats.best > 0 ? `${stats.best}/10` : "—"}</strong>
            <span>Best quiz score</span>
          </div>
        </div>
      </section>

      {/* Mode cards */}
      <section className="modes">
        <div className="section-head">
          <h2>Choose your workout</h2>
          <p>Five ways to prepare — pick what fits your mood today.</p>
        </div>
        <div className="mode-grid">
          {modes.map((m) => (
            <Link key={m.to} to={m.to} className={`mode-card accent-${m.accent}`}>
              <span className="mode-icon">{m.icon}</span>
              <div className="mode-body">
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
              <span className="mode-cta">
                {m.cta} <IconArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="home-foot">
        <p>
          Based on the 128 official USCIS civics questions (2025 test) · Your progress is
          saved on this device
        </p>
      </footer>
    </main>
  );
}

export default Home;
