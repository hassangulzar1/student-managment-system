import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/1-Dashboard/Dashboard";
import Students from "./pages/2- Students/Students";
import Courses from "./pages/3- Courses/Courses";
import Attendence from "./pages/4- Attendence/Attendence";
import Root from "./pages/Root";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "students",
        element: <Students />,
        // loader: studentLoader,
      },
      { path: "courses", element: <Courses /> },
      { path: "attendence", element: <Attendence /> },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
