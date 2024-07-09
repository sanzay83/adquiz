import React, { useState } from "react";
import data from "../assets/writing.json";
import "./styles/Writing.css";
import { Link } from "react-router-dom";

function Writing() {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div>
      <Link className="exit" to="/">
        X
      </Link>
      <div className="readingContainer">
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
                  <li key={index}>
                    <a href={`#${item.replace(/\s+/g, "").toLowerCase()}`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Writing;
