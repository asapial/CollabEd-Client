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
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageSessions from "../pages/dashboard/admin/ManageSessions";
import ManageMaterials from "../pages/dashboard/admin/ManageMaterials";
import BookedSession from "../pages/dashboard/student/BookedSession";
import CreateNote from "../pages/dashboard/student/CreateNote";
import ManageNotes from "../pages/dashboard/student/ManageNotes";
import StudyMaterials from "../pages/dashboard/student/StudyMaterials";
import UpdateNotes from "../pages/dashboard/student/UpdateNotes";
import AllSessions from "../pages/StudySessions/AllSessions";
import SessionDetails from "../pages/StudySessions/SessionDetails";
import PrivateRoute from "../RouteProtector/PrivateRoute";
import AllTutors from "../pages/Tutors/AllTutors";
import Payment from "../pages/Payment/Payment";
import ResetLink from "../pages/Auth/ResetLink";
import UpdateProfile from "../pages/Auth/UpdateProfile";
import StudentOverview from "../pages/dashboard/student/StudentOverview";
import TutorOverview from "../pages/dashboard/tutor/TutorOverview";
import AdminOverview from "../pages/dashboard/admin/AdminOverview";

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
          // path:"resetLink",
          // Component: ResetLink
      // }
      {
          path:"allSessions",
          Component: AllSessions
      },
      {
          path:"sessionDetails/:id",
          Component: SessionDetails
      },
      {
          path:"tutors",
          Component: AllTutors
      },
      {
          path:"/payment/:id",
          Component: Payment
      }
    ],
  },
  {
    path: "adminDashboard",
    element:<PrivateRoute requiredRole={"Admin"}><AdminDashboardLayout></AdminDashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: AdminOverview,
      },
      {
        path: "allUsers",
        Component: ManageUsers ,
      },
      {
        path: "allStudySessions",
        Component: ManageSessions  ,
      },
      {
        path: "allMaterials",
        Component: ManageMaterials ,
      },
      {
          path:"updateProfile",
          Component: UpdateProfile
      },

    ],
  },
  {
    path: "tutorDashboard",
    element:<PrivateRoute requiredRole={"Tutor"}><TutorDashboardLayout></TutorDashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: TutorOverview,
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
        path:"uploadMaterials/:id",
        Component:UploadMaterials
      },
      {
        path:"uploadMaterials",
        Component:UploadMaterials
      },
      {
        path:"viewMaterials",
        Component:ViewMaterials
      },
      {
          path:"updateProfile",
          Component: UpdateProfile
      },
    ],
  },
  {
    path: "studentDashboard",
    element:<PrivateRoute requiredRole={"Student"}><StudentDashboardLayout></StudentDashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: StudentOverview,
      },
      {
        path: "bookedSession",
        Component: BookedSession
      },
      {
        path: "createNote",
        Component: CreateNote
      },
      {
        path: "updateNote/:id",
        Component: UpdateNotes
      },
      {
        path: "manageNotes",
        Component: ManageNotes
      },
      {
        path: "studyMaterials",
        Component: StudyMaterials
      },
      {
          path:"updateProfile",
          Component: UpdateProfile
      },
    ],
  },
]);

export default router;
