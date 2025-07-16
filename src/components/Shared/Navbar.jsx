import React, { useContext } from "react";
import CollabEdNamePlate from "../NamePlate/CollabEdNamePlate";
import { Link } from "react-router";
import { AuthContext } from "../../main";
import SectionContainer from "../SectionContainer/SectionContainer";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const list = (
    <>
      {" "}
      <li>
        <Link to={"/tutors"}>Tutor</Link>
      </li>
      <li>
        <Link to={"/allSessions"}>Study sessions</Link>
      </li>
      {user?.userRole === "Tutor" && (
              <li>
        <Link to={"/tutorDashboard"}>Dashboard</Link>
      </li>)}
      {user?.userRole === "Admin" && (
              <li>
        <Link to={"/adminDashboard"}>Dashboard</Link>
      </li>)}
      {user?.userRole === "Student" && (
              <li>
        <Link to={"/studentDashboard"}>Dashboard</Link>
      </li>)}

    </>
  );
  return (
    <div className=" w-full max-w-7xl mx-auto ">
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {list}
            </ul>
          </div>
          <Link className="text-xl">
            <CollabEdNamePlate></CollabEdNamePlate>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{list}</ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-primary rounded-2xl">
            <Link to={"/login"}>Login</Link>
          </button>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar mr-12 md:m-0"
          >
            <div className="w-10 rounded-full">
              <img src={user?.photoURL} />
              {/* <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
