import React from "react";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import Navbar from "./src/components/Shared/Navbar";
import Footer from "./src/components/Shared/Footer";



const Root = () => {
  return (
    <div>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Root;
