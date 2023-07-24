import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInForm from "./routes/SignInForm";
import SignupForm from "./routes/SignupForm";
import ErrorPage from "./error.page";
import "./styles/main.css";
import "./styles/Form.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupForm />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    // <GlobalStateProvider>
    // <GlobalMethodsProvider>
    <RouterProvider router={router} />
    // </GlobalMethodsProvider>
    // </GlobalStateProvider>
  );
}

export default App;
