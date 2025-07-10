import React from "react";
import { IoMdClose } from "react-icons/io";
import AdminLink from "./AdminLink";

const AdminLinkDrawer = ({ mobileOpen, setMobileOpen }) => {
  if (!mobileOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0  bg-opacity-30 z-[1999]"
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 left-0 h-screen w-[80vw] max-w-xs bg-base-200 shadow-lg z-[2000] flex flex-col p-4 transform transition-transform duration-300">
        {/* Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="self-end text-gray-500 hover:text-red-500 text-2xl focus:outline-none mb-4"
          aria-label="Close drawer"
        >
          <IoMdClose />
        </button>

        {/* Sidebar Links */}
        <AdminLink></AdminLink>
      </div>
    </>
  );
};

export default AdminLinkDrawer;
