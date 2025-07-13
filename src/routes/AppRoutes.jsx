import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../../Root";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Banner from "../components/Home/Banner";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import TutorDashboardLayout from "../layouts/TutorDashboardLayout";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import UploadMaterials from "../pages/dashboard/tutor/UploadMaterials";
import CreateSession from "../pages/dashboard/tutor/CreateSession";
import MySessions from "../pages/dashboard/tutor/MySessions";
import ViewMaterials from "../pages/dashboard/tutor/ViewMaterials";
import Loading from "../pages/Others/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      // {
      //     path:"resetLink",
      //     Component: ResetLink
      // }
    ],
  },
  {
    path: "adminDashboard",
    Component: AdminDashboardLayout,
    children: [
      {
        index: true,
        Component: Banner,
      },
    ],
  },
  {
    path: "tutorDashboard",
    Component: TutorDashboardLayout,
    children: [
      {
        index: true,
        Component: Banner,
      },
      {
        path:"createSession",
        Component: CreateSession
      },
      {
        path:"mySession",
        Component: MySessions
      },
      {
        path:"uploadMaterials",
        Component:UploadMaterials
      },
      {
        path:"viewMaterials",
        // Component:ViewMaterials
        Component:Loading
      }
    ],
  },
  {
    path: "studentDashboard",
    Component: StudentDashboardLayout,
    children: [
      {
        index: true,
        Component: Banner,
      },
    ],
  },
]);

export default router;
