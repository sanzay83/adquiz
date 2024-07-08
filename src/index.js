import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Progress from "./components/Progress";
import Result from "./components/Result";
import Review from "./components/Review";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/adquiz",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
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
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
