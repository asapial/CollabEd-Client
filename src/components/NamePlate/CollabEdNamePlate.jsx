import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router";
import img from "../../assets/Picture/collabed-high-resolution-logo-transparent (1).png"

const CollabEdNamePlate = () => {
  return (
    <Link to={'/'}>
          <span className="flex items-center gap-2">
      <img src={img} alt="" srcset="" className=" w-10 h-10"/>
      <span className=" font-bold text-primary ">CollabEd</span>
    </span>
    </Link> 
  );
};

export default CollabEdNamePlate;
