import { createBrowserRouter } from "react-router-dom";
import Classes from "../components/pages/Classes/Classes";
import AddClass from "../components/pages/DashBoard/AddClass/AddClass";
import ManageClass from "../components/pages/DashBoard/ManageClass/ManageClass";
import ManagerUsers from "../components/pages/DashBoard/ManagerUsers/ManagerUsers";
import MyClass from "../components/pages/DashBoard/MyClass/MyClass";
import MyEnrolledClass from "../components/pages/DashBoard/MyEnrolledClass/MyEnrolledClass";
import MySelectedClass from "../components/pages/DashBoard/MySelectedClass/MySelectedClass";
import PayMent from "../components/pages/DashBoard/PayMent/PayMent";
import PaymentHistory from "../components/pages/DashBoard/PaymentHistory/PaymentHistory";
import UpdateClass from "../components/pages/DashBoard/UpdateClass/UpdateClass";
import ErrorPage from "../components/pages/ErrorPage/ErrorPage";
import Home from "../components/pages/Home/Home/Home";
import Instructors from "../components/pages/Instructors/Instructors";
import Login from "../components/pages/Login/Login";
import SignUp from "../components/pages/SignUp/SignUp";
import DashBoard from "../LayOut/DashBoard/DashBoard";
import Main from "../LayOut/Main/Main";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import PrivateRoute from "./PrivateRoute";
import StudentRoute from "./StudentRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "manageusers",
        element: (
          <AdminRoute>
            <ManagerUsers></ManagerUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageclass",
        element: (
          <AdminRoute>
            <ManageClass></ManageClass>
          </AdminRoute>
        ),
      },
      {
        path: "addclass",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "myclass",
        element: (
          <InstructorRoute>
            <MyClass></MyClass>
          </InstructorRoute>
        ),
      },
      {
        path: "updateclass/:id",
        element: (
          <InstructorRoute>
            <UpdateClass></UpdateClass>
          </InstructorRoute>
        ),
      },

      {
        path: "myselectedclass",
        element: (
          <StudentRoute>
            <MySelectedClass></MySelectedClass>
          </StudentRoute>
        ),
      },
      {
        path: "myenrolledclass",
        element: (
          <StudentRoute>
            <MyEnrolledClass></MyEnrolledClass>
          </StudentRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <StudentRoute>
            <PayMent></PayMent>
          </StudentRoute>
        ),
      },
      {
        path: "paymenthistory",
        element: (
          <StudentRoute>
            <PaymentHistory></PaymentHistory>
          </StudentRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
