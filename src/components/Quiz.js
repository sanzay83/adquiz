import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AllData from "../assets/data.json";
import "../styles/Quiz.css";

function Quiz() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const navigate = useNavigate();
  const questionsPerPage = 1;

  useEffect(() => {
    // Shuffle array function
    const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());

    // Randomly select 10 questions from AllData and shuffle their options
    const shuffledQuestions = shuffleArray([...AllData])
      .slice(0, 10)
      .map((question) => ({
        ...question,
        options: shuffleArray(question.options),
      }));

    setSelectedQuestions(shuffledQuestions);
  }, []);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = selectedQuestions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  const handleSubmit = () => {
    const score = selectedQuestions.reduce((acc, question) => {
      return acc + (selectedAnswers[question.id] === question.correct ? 1 : 0);
    }, 0);

    // Store the score, selected answers, and questions in localStorage
    localStorage.setItem("quizScore", score);
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
    localStorage.setItem(
      "selectedQuestions",
      JSON.stringify(selectedQuestions)
    );

    // Retrieve past attempts from localStorage
    const pastAttempts = JSON.parse(localStorage.getItem("pastAttempts")) || [];
    const newAttempt = {
      score,
      date: new Date().toLocaleString(),
    };

    // Store only the last 10 attempts
    const updatedAttempts = [newAttempt, ...pastAttempts].slice(0, 10);
    localStorage.setItem("pastAttempts", JSON.stringify(updatedAttempts));

    // Navigate to the result page
    navigate("/result");
  };

  const totalPages = Math.ceil(selectedQuestions.length / questionsPerPage);

  return (
    <div className="app">
      <div className="container">
        <Link className="exit" to="/adquiz">
          <div className="header">
            <button className="close-button">✖</button>
          </div>
        </Link>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="quiz-container">
          {currentQuestions.map((data) => (
            <div key={data.id}>
              <div className="question-text">{data.question}</div>
              {data.options.map((option, index) => (
                <div key={index} className="option">
                  <button
                    className={
                      selectedAnswers[data.id] === option ? "selected" : ""
                    }
                    onClick={() => handleOptionChange(data.id, option)}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          className="main-button"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {currentPage < totalPages ? (
          <button
            className="main-button"
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        ) : (
          <button className="main-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz;
