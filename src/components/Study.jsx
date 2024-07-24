import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/StudyMaterial.css";

function Study() {
  const navigate = useNavigate();
  const studyType = [
    {
      title: "Study Questions",
      type: "study",
    },
    {
      title: "Writing Vocabulary",
      type: "writing",
    },
    {
      title: "Reading Vocabulary",
      type: "reading",
    },
  ];

  const handleButton = (item) => {
    navigate("/quizStudy", { state: { type: item.type } });
  };

  return (
    <div className="menu-container">
      <div className="glassify">
        <Link className="exit" to="/adquiz">
          <div className="header">
            <button className="close-button">✖</button>
          </div>
        </Link>
        <h1 className="menu-header">Learning Activities</h1>

        {studyType.map((item, index) => (
          <button
            key={index}
            className="main-button"
            onClick={() => handleButton(item)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Study;
