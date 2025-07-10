import React from "react";
import SectionContainer from "../SectionContainer/SectionContainer";
import educationBanner from "../../assets/Animation/educationBanner.json"
import Lottie from "lottie-react";

const Banner = () => {
  return (
<SectionContainer className="bg-base-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center ">
          {/* Left content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-primary">
              <span className="block">Shared</span>
              <span className="block bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Collaborative
              </span>
              <span className="block">Platform, For Your Education</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-accent leading-relaxed max-w-xl mx-auto md:mx-0">
              Empower your learning journey with a smart platform built for collaboration,
              tutor guidance, and real-time educational support. Take notes, attend
              sessions, and grow together.
            </p>

            <div className="mt-8 flex justify-center md:justify-start gap-4">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full shadow-md transition">
                Explore Sessions
              </button>
              <button className="px-6 py-3 border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 font-medium rounded-full transition">
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
