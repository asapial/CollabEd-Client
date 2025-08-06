import React from "react";
import SectionContainer from "../SectionContainer/SectionContainer";
import educationBanner from "../../assets/Animation/educationBanner.json";
import Lottie from "lottie-react";
import { FaRocket, FaInfoCircle } from "react-icons/fa";

const Banner = () => {
  return (
    <SectionContainer className=" customGradiant2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16 px-4">
        {/* Left content */}
        <div className="text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-primary">
            <span className="block">Shared</span>
            <span className="block ">
              Collaborative
            </span>
            <span className="block">Platform for Education</span>
          </h1>

          <p className="text-base md:text-lg text-secondary leading-relaxed max-w-xl mx-auto md:mx-0">
            Empower your learning journey with a smart platform built for collaboration,
            tutor guidance, and real-time educational support. Take notes, attend sessions,
            and grow together.
          </p>

          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            <button className="btn btn-primary rounded-full px-6 shadow-md gap-2">
              <FaRocket className="text-lg" />
              Explore Sessions
            </button>
            <button className="btn btn-outline btn-primary rounded-full px-6 shadow-md gap-2">
              <FaInfoCircle className="text-lg" />
              Learn More
            </button>
          </div>
        </div>

        {/* Right Lottie animation */}
        <div className="flex justify-center md:justify-end">
          <div className="w-[90%] md:w-[400px] lg:w-[460px]">
            <Lottie animationData={educationBanner} loop={true} />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Banner;
