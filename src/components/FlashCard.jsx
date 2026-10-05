import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "../styles/FlashCard.css";
import AllData from "../assets/studyData.json";
import { shuffle, loadJSON, saveJSON } from "../utils/quiz.js";
import {
  IconArrowLeft,
  IconArrowRight,
  IconX,
  IconCheck,
  IconShuffle,
  IconEye,
} from "./icons.jsx";

const KNOWN_KEY = "flashKnownIds";

function FlashCard() {
  const entries = useMemo(() => Object.entries(AllData), []);
  const [order, setOrder] = useState(() => shuffle(entries.map((_, i) => i)));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(() => loadJSON(KNOWN_KEY, []));

  const key = entries[order[pos]][0];
  const answers = entries[order[pos]][1];
  const isKnown = known.includes(key);

  useEffect(() => {
    saveJSON(KNOWN_KEY, known);
  }, [known]);

  const go = useCallback(
    (dir) => {
      setPos((p) => {
        const np = p + dir;
        if (np < 0 || np >= order.length) return p;
        return np;
      });
      setFlipped(false);
    },
    [order.length]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const reshuffle = () => {
    setOrder(shuffle(entries.map((_, i) => i)));
    setPos(0);
    setFlipped(false);
  };

  const toggleKnown = () => {
    setKnown((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const pct = Math.round((known.length / entries.length) * 100);

  return (
    <main className="screen narrow">
      <div className="quiz-topbar">
        <Link to="/" className="icon-btn" aria-label="Exit flashcards">
          <IconX />
        </Link>
        <div className="quiz-meta">
          <span className="tag">Flashcards</span>
          <span className="quiz-count">
            Card {pos + 1} of {entries.length}
          </span>
        </div>
        <button className="icon-btn" onClick={reshuffle} aria-label="Shuffle cards" title="Shuffle">
          <IconShuffle />
        </button>
      </div>

      <div className="progress-track quiz-progress">
        <div className="progress-fill green" style={{ width: `${pct}%` }} />
      </div>
      <p className="flash-sub">
        {known.length} of {entries.length} marked as known ({pct}%)
      </p>

      <div
        className={`flip-scene${isKnown ? " is-known" : ""}`}
        onClick={() => setFlipped((f) => !f)}
        role="button"
        tabIndex={0}
        aria-label={flipped ? "Show question" : "Show answer"}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target === e.currentTarget)
            setFlipped((f) => !f);
        }}
      >
        <div className={`flip-inner${flipped ? " flipped" : ""}`}>
          <div className="flip-face flip-front">
            <span className="flip-hint">
              <IconEye /> Tap to reveal
            </span>
            <p className="flip-q">{key}</p>
          </div>
          <div className="flip-face flip-back">
            <span className="flip-hint">Answer</span>
            <ul className="flip-answers">
              {answers.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="flash-actions">
        <button className="btn btn-ghost" onClick={toggleKnown}>
          {isKnown ? (
            <>
              <IconCheck /> Known — tap to unmark
            </>
          ) : (
            "Mark as known"
          )}
        </button>
      </div>

      <div className="quiz-nav">
        <button
          className="btn btn-ghost"
          onClick={() => go(-1)}
          disabled={pos === 0}
        >
          <IconArrowLeft /> Prev
        </button>
        <button
          className="btn btn-navy"
          onClick={() => go(1)}
          disabled={pos === order.length - 1}
        >
          Next <IconArrowRight />
        </button>
      </div>
    </main>
  );
}

export default FlashCard;
