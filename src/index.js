import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./routes/App";
import Quiz from "./routes/Quiz";
import Progress from "./routes/Progress";
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
