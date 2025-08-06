import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import DashboardSideBar from "./DashboardSideBar";
import { AuthContext } from "../../../main";
import { useNavigate } from "react-router";
import { FaSignOutAlt } from "react-icons/fa";


const DashboardDrawer = ({ mobileOpen, setMobileOpen, links }) => {
  const {user,signOutUser}=useContext(AuthContext);
    const navigate=useNavigate();
      const handleSignOut = () => {
      signOutUser().then(() => {
        navigate("/");
      });
    };
  
  if (!mobileOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0  bg-opacity-30 z-[1999]"
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 h-screen w-[80vw] max-w-xs customGradiant2 shadow-lg z-[2000] flex flex-col p-4 transform transition-transform duration-300">
        {/* Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="self-end text-gray-500 hover:text-red-500 text-2xl focus:outline-none mb-4"
          aria-label="Close drawer"
        >
          <IoMdClose />
        </button>

        {/* Sidebar Links */}
            <div className="w-full h-full p-5 customGradiant2">
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
      </div>
    </>
  );
};

export default DashboardDrawer;
