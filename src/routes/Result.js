import React from "react";
import { Link } from "react-router-dom";

function Result() {
  return (
    <div>
      This is a result page
      <Link to="/">
        <button className="buton">Home</button>
      </Link>
      <Link to="/quiz">
        <button className="buton">Next Attempt</button>
      </Link>
      <Link to="/review">
        <button className="buton">Review</button>
      </Link>
    </div>
  );
}

export default Result;
