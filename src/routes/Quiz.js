import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Quiz() {
  return (
    <div className="Quiz">
      <Link className="exit" to="/">
        X
      </Link>
      <>Flag Goes here</>
      <br />
      <>Question Goes here</>
      <br />
      <>Options Goes here</>

      <br />
      <div class="pagination">
        <a href="#">Prev</a>
        <a href="#">1</a>
        <a class="active" href="#">
          2
        </a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">Next</a>
      </div>
      <Link className="result" to="/result">
        <button className="buton">Submit</button>
      </Link>
    </div>
  );
}

export default Quiz;
