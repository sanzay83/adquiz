import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import dataStudy from "../assets/studyData.json";
import dataReading from "../assets/reading.json";
import dataWriting from "../assets/writing.json";
import "../styles/StudyMaterial.css";
import { IconX, IconSearch, IconChevronDown, IconCheck } from "./icons.jsx";

const TABS = [
  { id: "study", label: "Civics Q&A" },
  { id: "reading", label: "Reading Vocab" },
  { id: "writing", label: "Writing Vocab" },
];

const SOURCES = { study: dataStudy, reading: dataReading, writing: dataWriting };

function QuizStudy() {
  const location = useLocation();
  const initial = location.state?.type || "study";
  const [tab, setTab] = useState(TABS.some((t) => t.id === initial) ? initial : "study");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState({});

  const data = SOURCES[tab];

  const entries = useMemo(() => {
    const all = Object.entries(data);
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(
      ([k, v]) =>
        k.toLowerCase().includes(q) ||
        v.join(" ").toLowerCase().includes(q)
    );
  }, [data, query]);

  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }));

  const switchTab = (id) => {
    setTab(id);
    setQuery("");
    setOpen({});
  };

  return (
    <main className="screen">
      <div className="screen-head">
        <Link to="/study" className="icon-btn" aria-label="Back to study tracks">
          <IconX />
        </Link>
        <div className="screen-head-text">
          <h1>Study Material</h1>
          <p>Tap a question to reveal its accepted answers.</p>
        </div>
      </div>

      <div className="study-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={"study-tab" + (tab === t.id ? " active" : "")}
            onClick={() => switchTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label className="search-bar">
        <IconSearch />
        <input
          type="search"
          placeholder={`Search ${TABS.find((t) => t.id === tab).label.toLowerCase()}…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      <p className="study-count">
        {entries.length} {entries.length === 1 ? "item" : "items"}
        {query && ` matching “${query}”`}
      </p>

      <div className="study-list">
        {entries.map(([key, values]) => {
          const isOpen = !!open[key];
          return (
            <div key={key} className={"study-item" + (isOpen ? " open" : "")}>
              <button className="study-item-head" onClick={() => toggle(key)}>
                <span className="study-item-q">{key}</span>
                <span className={`study-item-chevron${isOpen ? " up" : ""}`}>
                  <IconChevronDown />
                </span>
              </button>
              {isOpen && (
                <ul className="study-item-answers">
                  {values.map((v, i) => (
                    <li key={i}>
                      <IconCheck /> {v}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {entries.length === 0 && (
        <div className="empty-state card">
          <h3>No matches found</h3>
          <p>Try a different search term.</p>
        </div>
      )}
    </main>
  );
}

export default QuizStudy;
