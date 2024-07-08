import React from "react";
import "./styles/Home.css";
import { Link, Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <div className="homeHeader">Welcome to American Dream Quiz</div>

      <div className="homeButtonContainer">
        <Link to="/quiz">
          <button className="button">Start</button>
        </Link>
        <Link to="/quiz">
          <button className="button">Start</button>
        </Link>
        <Link to="/progress">
          <button className="button">Progress</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
