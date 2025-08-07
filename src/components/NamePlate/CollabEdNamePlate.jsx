import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router";
import img from "../../assets/Picture/collabed-high-resolution-logo-transparent (1).png"
import { motion } from "framer-motion";

const CollabEdNamePlate = () => {
  return (
    <Link to={'/'}>
          <span className="flex items-center gap-2">
      <img src={img} alt="" srcset="" className=" w-7 h-7"/>
<motion.span
  className="font-bold text-transparent bg-clip-text bg-[linear-gradient(135deg,#103156,#3886C2,#103156)] bg-[length:200%_200%] text-stroke"
  animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "linear",
  }}
>
  CollabEd
</motion.span>
    </span>
    </Link> 
  );
};

export default CollabEdNamePlate;
