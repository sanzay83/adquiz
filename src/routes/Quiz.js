import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AllData from "../data.json";
import "./App.css";
import "./Quiz.css";

function Quiz() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const navigate = useNavigate();
  const questionsPerPage = 1;

  useEffect(() => {
    // Randomly select 2 questions from AllData
    const shuffledQuestions = [...AllData].sort(() => 0.5 - Math.random());
    const selected = shuffledQuestions.slice(0, 2);
    setSelectedQuestions(selected);
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
    <>
      <Link className="exit" to="/">
        X
      </Link>
      <div className="halfBackground"></div>
      <div className="quiz-container">
        {currentQuestions.map((data) => (
          <div key={data.id}>
            <div className="question-text">
              {data.id + ". " + data.question}
            </div>
            {data.options.map((option, index) => (
              <div key={index} className="option">
                <label>
                  <input
                    type="radio"
                    name={`question-${data.id}`}
                    value={option}
                    checked={selectedAnswers[data.id] === option}
                    onChange={() => handleOptionChange(data.id, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="pagination">
        <a
          href="#"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </a>
        {Array.from({ length: totalPages }, (_, index) => (
          <a
            key={index + 1}
            href="#"
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </a>
        ))}
        {currentPage < totalPages ? (
          <a href="#" onClick={() => paginate(currentPage + 1)}>
            Next
          </a>
        ) : (
          <a href="#" onClick={handleSubmit}>
            Submit
          </a>
        )}
      </div>
    </>
  );
}

export default Quiz;
