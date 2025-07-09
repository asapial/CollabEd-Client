import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import Root from "../../Root";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

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
]);


export default router;