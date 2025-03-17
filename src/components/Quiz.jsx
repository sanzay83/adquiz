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
    // Retrieve correctQuestionIds from localStorage or initialize it as an empty array
    let correctQuestionIds =
      JSON.parse(localStorage.getItem("correctQuestionIds")) || [];

    // Shuffle array function
    const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());

    // Filter out questions already answered correctly
    const availableQuestions = AllData.filter(
      (question) => !correctQuestionIds.includes(question.id)
    );

    // Keep selecting random questions until we have at least 10
    let selectedQuestions = [];
    while (selectedQuestions.length < 10) {
      const remainingQuestions = shuffleArray([...availableQuestions]);

      for (const question of remainingQuestions) {
        if (!selectedQuestions.find((q) => q.id === question.id)) {
          selectedQuestions.push({
            ...question,
            options: shuffleArray(question.options),
          });
        }
        if (selectedQuestions.length === 10) break;
      }
    }

    setSelectedQuestions(selectedQuestions);
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
    // Retrieve the existing correctQuestionIds from localStorage or initialize as an empty array
    let correctQuestionIds =
      JSON.parse(localStorage.getItem("correctQuestionIds")) || [];

    // Find IDs of correctly answered questions
    const newCorrectIds = selectedQuestions.reduce((acc, question) => {
      if (selectedAnswers[question.id] === question.correct) {
        acc.push(question.id);
      }
      return acc;
    }, []);

    // Merge new correct IDs with the existing ones, avoiding duplicates
    correctQuestionIds = Array.from(
      new Set([...correctQuestionIds, ...newCorrectIds])
    );

    // If the number of correct IDs reaches or exceeds 90, reset the list
    if (correctQuestionIds.length >= 90) {
      correctQuestionIds = [];
    }

    // Save the updated correctQuestionIds to localStorage
    localStorage.setItem(
      "correctQuestionIds",
      JSON.stringify(correctQuestionIds)
    );

    // Calculate the score
    const score = newCorrectIds.length;

    // Store the score, selected answers, and selected questions in localStorage
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
    <div className="container">
      <div className="quiz-container">
        <Link className="exit" to="/">
          <div className="header">
            <button className="close-button">✖</button>
          </div>
        </Link>
        <div className="halfBackgroundQuiz" />
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
        <div className="buttonContainer">
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
    </div>
  );
}

export default Quiz;
