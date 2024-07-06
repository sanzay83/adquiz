import React from "react";
import "./App.css";
import Header from "../component/Header";
import { Link, Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <Header />
      <Link className="quizStart" to="/quiz">
        <button className="button">Start</button>
      </Link>
      <Link className="progress" to="/progress">
        <button className="button">Progress</button>
      </Link>
      <Outlet />
    </div>
  );
}

export default Home;
