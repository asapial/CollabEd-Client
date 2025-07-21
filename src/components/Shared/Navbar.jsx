import React, { useContext, useState } from "react";
import CollabEdNamePlate from "../NamePlate/CollabEdNamePlate";
import { Link } from "react-router";
import { AuthContext } from "../../main";
import SectionContainer from "../SectionContainer/SectionContainer";
import { CgProfile } from "react-icons/cg";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user ,signOutUser} = useContext(AuthContext);
  const [theme, setTheme] = useState(true);
  console.log(user);
      const handleSignOut = () => {
    signOutUser().then(() => {
      navigate("/");
    });
  };

  const toggleTheme = () => {
    setTheme(!theme);
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    html.setAttribute(
      "data-theme",
      currentTheme === "CollabEdLight" ? "CollabEdDark" : "CollabEdLight"
    );
  };

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
        </li>
      )}
      {user?.userRole === "Admin" && (
        <li>
          <Link to={"/adminDashboard"}>Dashboard</Link>
        </li>
      )}
      {user?.userRole === "Student" && (
        <li>
          <Link to={"/studentDashboard"}>Dashboard</Link>
        </li>
      )}
    </>
  );
return (
  <>
    <div className="fixed top-0 z-50 w-full bg-base-100 shadow">
    <div className="navbar max-w-7xl mx-auto">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {list}
          </ul>
        </div>
        <Link className="text-2xl">
          <CollabEdNamePlate />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-xl">{list}</ul>
      </div>

      <div className="navbar-end flex justify-end items-center gap-2">
        <button onClick={toggleTheme} className=" mr-5">
          {!theme ? <FaSun size={30} /> : <FaMoon size={30} />}
        </button>

        {!user && (
          <>
            <button className="btn btn-primary rounded-2xl">
              <Link to={"/login"}>Login</Link>
            </button>
            <button className="btn btn-primary rounded-2xl">
              <Link to={"/register"}>Register</Link>
            </button>
          </>
        )}

        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar mr-12 md:m-0"
        >
          <div>
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User Avatar"}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <CgProfile size={30} />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Spacer to prevent content from hiding behind fixed navbar */}
  <div className="h-18"></div>
  </>
);

};

export default Navbar;
