import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/StudyMaterial.css";
import { IconBook, IconArrowRight, IconX } from "./icons.jsx";

const tracks = [
  {
    type: "study",
    title: "Civics Questions",
    desc: "All 100 official civics questions with their accepted answers.",
    count: "100 Q&As",
  },
  {
    type: "reading",
    title: "Reading Vocabulary",
    desc: "Every word and phrase you may be asked to read aloud.",
    count: "Vocabulary",
  },
  {
    type: "writing",
    title: "Writing Vocabulary",
    desc: "Every word and phrase you may be asked to write down.",
    count: "Vocabulary",
  },
];

function Study() {
  const navigate = useNavigate();

  return (
    <main className="screen">
      <div className="screen-head">
        <Link to="/" className="icon-btn" aria-label="Back home">
          <IconX />
        </Link>
        <div className="screen-head-text">
          <h1>Study Material</h1>
          <p>Learn at your own pace — search, browse, and master each topic.</p>
        </div>
      </div>

      <div className="study-tracks">
        {tracks.map((t) => (
          <button
            key={t.type}
            className="study-track-card"
            onClick={() => navigate("/quizStudy", { state: { type: t.type } })}
          >
            <span className="study-track-icon">
              <IconBook />
            </span>
            <span className="study-track-body">
              <strong>{t.title}</strong>
              <span>{t.desc}</span>
            </span>
            <span className="study-track-meta">
              <span className="tag">{t.count}</span>
              <IconArrowRight />
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}

export default Study;
