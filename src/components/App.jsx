import React from "react";
import Home from "./Home.jsx";
import Quiz from "./Quiz.jsx";
import Progress from "./Progress.jsx";
import Result from "./Result.jsx";
import Review from "./Review.jsx";
import Study from "./Study.jsx";
import QuizStudy from "./QuizStudy.jsx";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "../styles/App.css";
import QuizMarathon from "./QuizMarathon.jsx";
import Flashcard from "./FlashCard.jsx";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flashcard" element={<Flashcard />} />
          <Route path="/study" element={<Study />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quizmarathon" element={<QuizMarathon />} />
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
