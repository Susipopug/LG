import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";
import { Header } from "./components/Header/Header";
import { LetterSent } from "./components/LetterSent/LetterSent";
import { RestorePassword } from "./components/RestorePassword/RestorePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // Default route for "/"
        element: <Header />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot",
        element: <ForgotPassword />,
      },
      {
        path: "letterSent",
        element: <LetterSent />,
      },
      {
        path: "restorePassword",
        element: <RestorePassword />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
