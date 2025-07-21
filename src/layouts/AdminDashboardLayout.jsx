import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaX } from "react-icons/fa6";
import { RiMenuFold4Fill, RiMenuUnfold4Line } from "react-icons/ri";
import AdminLink from "../components/dashboard/SideBar/DashboardSideBar";
import AdminLinkDrawer from "../components/dashboard/SideBar/DashboardDrawer";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import DashboardSideBar from "../components/dashboard/SideBar/DashboardSideBar";
import DashboardDrawer from "../components/dashboard/SideBar/DashboardDrawer";
import { FaChalkboardTeacher, FaFolderOpen, FaUserEdit, FaUsersCog } from "react-icons/fa";

const AdminDashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = (
<>
  <NavLink
    to="/adminDashboard/allUsers"
    className={({ isActive }) =>
      isActive
        ? "flex items-center gap-3 text-lg font-semibold text-green-600"
        : "flex items-center gap-3 text-lg hover:text-green-600 transition"
    }
  >
    <FaUsersCog className="text-xl" />
    View All Users
  </NavLink>

  <NavLink
    to="/adminDashboard/allStudySessions"
    className={({ isActive }) =>
      isActive
        ? "flex items-center gap-3 text-lg font-semibold text-purple-600"
        : "flex items-center gap-3 text-lg hover:text-purple-600 transition"
    }
  >
    <FaChalkboardTeacher className="text-xl" />
    All Study Sessions
  </NavLink>

  <NavLink
    to="/adminDashboard/allMaterials"
    className={({ isActive }) =>
      isActive
        ? "flex items-center gap-3 text-lg font-semibold text-amber-600"
        : "flex items-center gap-3 text-lg hover:text-amber-600 transition"
    }
  >
    <FaFolderOpen className="text-xl" />
    All Materials
  </NavLink>

  <NavLink
    to="/adminDashboard/updateProfile"
    className={({ isActive }) =>
      isActive
        ? "flex items-center gap-3 text-lg font-semibold text-sky-600"
        : "flex items-center gap-3 text-lg hover:text-sky-600 transition"
    }
  >
    <FaUserEdit className="text-xl" />
    Update Profile
  </NavLink>
</>

  );

  return (
    <div className="max-h-screen flex flex-col relative">
      {open ? (
        <button
          onClick={() => setOpen(!open)}
          className=" top-7  left-5 hidden md:block z-100 fixed"
        >
          <FaX size={20}></FaX>
        </button>
      ) : (
        <button
          onClick={() => setOpen(!open)}
          className="  top-7  left-5 hidden md:block  z-100 fixed"
        >
          <RiMenuFold4Fill size={20} />
        </button>
      )}

      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className=" top-5  right-5 md:hidden   z-100 fixed "
        >
          <RiMenuUnfold4Line size={20} />
        </button>
      )}

      <div className="navBarContainer flex justify-center shadow-sm ">
        <Navbar></Navbar>
      </div>
      <div className="flex flex-1">
        {/* Sidebar */}
        {open && (
          <aside className="w-1/5 min-w-[300px] h-screen hidden md:block">
            <div className=" h-full ">
              <DashboardSideBar links={links}></DashboardSideBar>
            </div>
          </aside>
        )}

        <DashboardDrawer
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          links={links}
        ></DashboardDrawer>
        {/* Main Content */}
        <main className="w-full flex flex-col h-screen">
          <div className="flex-1 overflow-y-auto ">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardLayout;
