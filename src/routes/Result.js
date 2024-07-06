import React from "react";
import { Link } from "react-router-dom";
import "./Result.css";

function Result() {
  return (
    <>
      <Link className="exit" to="/">
        X
      </Link>
      <div className="halfBackground"> </div>
      <div className="trf">
        <img src={require("./background.png")} /> <br />
        Conditional Text
      </div>
      <div className="resultButtonContainer">
        <Link to="/quiz">
          <button className="button">Next Attempt</button>
        </Link>
        <Link to="/review">
          <button className="button">Review</button>
        </Link>
      </div>
    </>
  );
}

export default Result;
