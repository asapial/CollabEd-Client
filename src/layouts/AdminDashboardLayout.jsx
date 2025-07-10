import React, { useState } from "react";
import { Outlet } from "react-router";
import { FaX } from "react-icons/fa6";
import { RiMenuFold4Fill } from "react-icons/ri";
import AdminLink from "../components/dashboard/admin/AdminLink";
import AdminLinkDrawer from "../components/dashboard/admin/AdminLinkDrawer";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const AdminDashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="max-h-screen flex flex-col relative">
      {open ? (
        <button
          onClick={() => setOpen(!open)}
          className=" top-7  left-5 hidden md:block z-50 fixed"
        >
          <FaX size={20}></FaX>
        </button>
      ) : (
        <button
          onClick={() => setOpen(!open)}
          className="  top-7  left-5 hidden md:block  z-50 fixed"
        >
          <RiMenuFold4Fill size={20} />
        </button>
      )}

      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className=" top-40  left-5 md:hidden   z-50 fixed "
        >
          <RiMenuFold4Fill size={30} />
        </button>
      )}

      <div className="navBarContainer flex justify-center shadow-sm mb-50  lg:mb-18">
        <Navbar></Navbar>
      </div>
      <div className="flex flex-1">
        {/* Sidebar */}
        {open && (
          <aside className="w-1/5 min-w-[300px] h-screen hidden md:block">
            <div className=" h-full ">
              <AdminLink></AdminLink>
            </div>
          </aside>
        )}

        <AdminLinkDrawer
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        ></AdminLinkDrawer>
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
