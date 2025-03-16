import React, { useState, useEffect } from "react";
import dataStudy from "../assets/studyData.json";
import dataReading from "../assets/reading.json";
import dataWriting from "../assets/writing.json";
import "../styles/StudyMaterial.css";
import { Link, useLocation } from "react-router-dom";

function QuizStudy() {
  const [data, setData] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();
  const { type } = location.state;

  const fetchData = () => {
    if (type === "study") {
      setData(dataStudy);
    } else if (type === "reading") {
      setData(dataReading);
    } else if (type === "writing") {
      setData(dataWriting);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const toggleDropdown = (key) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="readingContainer">
      <Link className="exit" to="/">
        <div className="header">
          <button className="close-button">✖</button>
        </div>
      </Link>
      <div className="dropdown-container">
        {Object.keys(data).map((key) => (
          <div className="dropdown" key={key}>
            <button
              onClick={() => toggleDropdown(key)}
              className="dropdown-toggle"
            >
              {key} <span className="dropdown-icon">▼</span>
            </button>
            {openDropdowns[key] && (
              <ul className="dropdown-menu">
                {data[key].map((item, index) => (
                  <li key={index}>▹{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizStudy;
