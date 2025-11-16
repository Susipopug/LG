import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { Login } from "./modules/auth/Login";
import { Register } from "./modules/auth/Register";
import { ForgotPassword } from "./modules/auth/ForgotPassword";
import { RestorePassword } from "./modules/auth/RestorePassword";
import { Success } from "./modules/auth/Success";
import "@assets/fonts/fonts.css";
import { CalendarProvider } from "./components/context/CalendarContext";
import { Calendar } from "./modules/pages/CalendarPage/Calendar";
import { Students } from "./modules/pages/Students/Students";
import { SheduleAndPanel } from "./modules/pages/Shedule/SheduleAndPanel";

const isLoggedIn = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App isLoggedIn={isLoggedIn} />,
    children: [
      {
        index: true,
        element: isLoggedIn ? (
          <Navigate to={"/main"} />
        ) : (
          <Navigate to={"/login"} />
        ),
      },

      ...(isLoggedIn
        ? [
            {
              path: "main",
              element: <SheduleAndPanel />,
            },
            {
              path: "calendar",
              element: <Calendar />,
            },
            {
              path: "students",
              element: <Students />,
            },
          ]
        : []),

      ...(!isLoggedIn
        ? [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
            {
              path: "success",
              element: <Success />,
            },
            {
              path: "forgotPassword",
              element: <ForgotPassword />,
            },
            {
              path: "restorePassword",
              element: <RestorePassword />,
            },
          ]
        : []),

      {
        path: "*",
        element: <Navigate to={isLoggedIn ? "/main" : "/login"} replace />,
      },
    ],
  },
]);

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  return worker.start();
}

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <CalendarProvider>
        <RouterProvider router={router} />
      </CalendarProvider>
    </StrictMode>
  )
);
