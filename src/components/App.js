import React from "react";
import Home from "./Home";
import Quiz from "./Quiz";
import Progress from "./Progress";
import Result from "./Result";
import Review from "./Review";
import Study from "./Study";
import QuizStudy from "./QuizStudy.js";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import "../styles/App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<Study />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/result" element={<Result />} />
          <Route path="/review" element={<Review />} />
          <Route path="/quizStudy" element={<QuizStudy />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
