import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./routes/App";
import Quiz from "./routes/Quiz";
import Progress from "./routes/Progress";
import Result from "./routes/Result";
import Review from "./routes/Review";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "quiz",
    element: <Quiz />,
  },
  {
    path: "progress",
    element: <Progress />,
  },
  {
    path: "result",
    element: <Result />,
  },
  {
    path: "Review",
    element: <Review />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
