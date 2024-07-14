import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Quiz from "./components/Quiz";
import Progress from "./components/Progress";
import Result from "./components/Result";
import Review from "./components/Review";
import Study from "./components/Study";
import QuizStudy from "./components/QuizStudy.js";
import Writing from "./components/Writing";
import Reading from "./components/Reading";
import "./styles/index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/adquiz",
    element: <App />,
  },
  {
    path: "/study",
    element: <Study />,
  },
  {
    path: "/quiz",
    element: <Quiz />,
  },
  {
    path: "/progress",
    element: <Progress />,
  },
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "/review",
    element: <Review />,
  },
  {
    path: "/quizStudy",
    element: <QuizStudy />,
  },
  {
    path: "/writing",
    element: <Writing />,
  },
  {
    path: "/reading",
    element: <Reading />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);