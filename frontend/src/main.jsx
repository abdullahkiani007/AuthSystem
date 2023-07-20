import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { useSelector } from "react-redux";
import Protected from "./components/Protected.jsx";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import VerifyEmail from "./components/VerifyEmail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="overflow-hidden h-screen">
        <App />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      { path: "/verify", element: <VerifyEmail /> },
      {
        path: "/home",
        element: <Protected />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
