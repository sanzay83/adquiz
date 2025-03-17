import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AllData from "../assets/data.json";
import "../styles/Quiz.css";

function QuizMarathon() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());

    const shuffledQuestions = shuffleArray(AllData);

    const randomizedQuestions = shuffledQuestions.map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }));

    setSelectedQuestions(randomizedQuestions);
  }, []);

  useEffect(() => {
    const countCorrectAnswers = selectedQuestions.reduce((count, question) => {
      if (selectedAnswers[question.id] === question.correct) {
        count += 1;
      }
      return count;
    }, 0);
    setCorrectAnswersCount(countCorrectAnswers);
  }, [selectedAnswers, selectedQuestions]);

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
    setIsOptionSelected(true);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    setIsOptionSelected(false);
  };

  const currentQuestion = selectedQuestions[currentPage];
  const isAnswerSelected = selectedAnswers[currentQuestion?.id];

  return (
    <div className="container">
      <div className="quiz-container">
        <Link className="exit" to="/">
          <div className="header">
            <button className="close-button">✖</button>
          </div>
        </Link>
        <div className="halfBackgroundQuiz" />

        <div className="correct-answers-counter">
          Correct Answers: {correctAnswersCount}
        </div>

        <div className="question-counter">
          Question {currentPage + 1} of {selectedQuestions.length + 1}
        </div>

        <div className="question-text">{currentQuestion?.question}</div>
        {currentQuestion?.options.map((option, index) => {
          const isSelected = selectedAnswers[currentQuestion?.id] === option;
          const isCorrect = currentQuestion.correct === option;
          const isDisabled = isSelected || isOptionSelected;
          const opacityClass = isDisabled ? "disabled-opacity" : "";
          return (
            <div key={index} className="option">
              <button
                className={`option-button ${isSelected ? "selected" : ""} ${
                  isCorrect && isSelected
                    ? "correct"
                    : isSelected && !isCorrect
                    ? "incorrect"
                    : ""
                } ${opacityClass}`}
                onClick={() => handleOptionChange(currentQuestion.id, option)}
                disabled={isDisabled}
              >
                {option}
              </button>
            </div>
          );
        })}
        {isAnswerSelected && (
          <div className="buttonContainer">
            {currentPage < selectedQuestions.length - 1 ? (
              <button className="main-button" onClick={handleNext}>
                Next
              </button>
            ) : (
              <div className="popup">
                <div className="popup-content">
                  <p>You got {correctAnswersCount}/100 correct</p>
                  <button onClick={() => navigate("/")}>CLOSE</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizMarathon;
