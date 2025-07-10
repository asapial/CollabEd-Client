import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../../Root";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Banner from "../components/Home/Banner";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
        {
            index:true,
            Component: Home
        },
        {
            path:"login",
            Component: Login
        },
        {
            path:"register",
            Component: Register
        },
        // {
        //     path:"resetLink",
        //     Component: ResetLink
        // }
    ]
  },
    {
    path: "dashboard",
    Component: AdminDashboardLayout,
    children: [
      {
        index: true,
        Component: Banner
      }
     
    ],
  },
]);


export default router;