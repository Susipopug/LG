import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { Login } from "./modules/auth/Login";
import { Register } from "./modules/auth/Register";
import { ForgotPassword } from "./modules/auth/ForgotPassword";
import { RestorePassword } from "./modules/auth/RestorePassword";
import { Success } from "./modules/auth/Success";
import { Main } from "./modules/pages/main/Main";
import { Calendar } from "./modules/pages/calendar/Calendar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
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
      {
        path: "calendar",
        element: <Calendar />,
      },
    ],
  },
]);

// async function enableMocking() {
//   if (process.env.NODE_ENV !== "development") {
//     return;
//   }

//   const { worker } = await import("./mocks/browser");

//   // `worker.start()` returns a Promise that resolves
//   // once the Service Worker is up and ready to intercept requests.
//   return worker.start();
// }

// enableMocking().then(() =>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
// );
