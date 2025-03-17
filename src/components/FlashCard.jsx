import React, { useState } from "react";
import "../styles/FlashCard.css";
import "../styles/Quiz.css";
import AllData from "../assets/studyData.json";

const FlashcardApp = () => {
  const questions = Object.entries(AllData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const [question, answers] = questions[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div class="card">
        <div class="card-inner">
          <div class="card-front">
            <p>Q{question}</p>
          </div>
          <div class="card-back">
            <p>Answer: {answers.join(", ")}</p>
          </div>
        </div>
      </div>

      <div className="buttonContainer">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="main-button"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === questions.length - 1}
          className="main-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlashcardApp;
