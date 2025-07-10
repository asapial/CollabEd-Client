import React, { useContext } from "react";
import {
  FaUserCircle,
  FaPlusCircle,
  FaBookOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../main";

const AdminLink = () => {
  const { user,signOutUser } = useContext(AuthContext);
  const navigate=useNavigate();
    const handleSignOut = () => {
    signOutUser().then(() => {
      navigate("/");
    });
  };

  const links=<> <Link to={"/dashboard/addRecipe"}>
              <li className="flex items-center gap-3 text-lg  hover:text-green-600 cursor-pointer transition">
                <FaPlusCircle className="text-xl" />
                Add Recipe
              </li>
            </Link>

            <Link to={"/dashboard/myRecipe"}>
              <li className="flex items-center gap-3 text-lg  hover:text-purple-600 cursor-pointer transition">
                <FaBookOpen className="text-xl" />
                My Recipe
              </li>
            </Link>
            <Link to={"/dashboard/myProfile"}>
              <li className="flex items-center gap-3 text-lg  hover:text-blue-600 cursor-pointer transition">
                <FaUserCircle className="text-xl" />
                My Profile
              </li>
            </Link></>

  return (
    <div className="w-full h-full p-5 bg-base-200">
      <div className="flex flex-col items-center gap-6">
        {/* Dashboard Title */}
        <div className="w-full flex items-center justify-center mb-2">
          <div className=" w-1/5">
            <img
              src={user?.photoURL}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-primary shadow"
            />
          </div>
          <div className=" w-4/5 px-1">
            <h1 className=" text-lg font-bold">{user?.displayName}</h1>
            <h1 className=" text-sm">{user?.email}</h1>
          </div>
        </div>
        {/* Navigation Links */}
        <nav className="w-full">
          <ul className="flex flex-col gap-4">
           {links}
          </ul>
        </nav>
        {/* Logout */}
        <button onClick={handleSignOut} className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition w-full justify-center">
          <FaSignOutAlt className="text-lg" />
          Log Out
        </button>

      </div>
    </div>
  );
};

export default AdminLink;
