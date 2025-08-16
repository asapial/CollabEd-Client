import React from "react";
import SectionContainer from "../SectionContainer/SectionContainer";

const HowItWorks = () => {
  const steps = [
    {
      title: "Join CollabEd",
      desc: "Create your free account and set up your learning profile.",
      icon: "👤",
    },
    {
      title: "Collaborate",
      desc: "Find peers, join sessions, and learn together in real-time.",
      icon: "🤝",
    },
    {
      title: "Achieve",
      desc: "Track progress, earn achievements, and showcase your skills.",
      icon: "🏆",
    },
  ];

  return (
<SectionContainer className=" customGradiant1">
      <h2 className="text-3xl font-bold text-center mb-12">
        How CollabEd Works
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center relative">
            {/* Step Icon */}
            <div className="text-6xl mb-4">{step.icon}</div>

            {/* Step Title */}
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>

            {/* Step Description */}
            <p className="text-base-content/70 max-w-xs">{step.desc}</p>

            {/* Connector line for desktop */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute right-[-6rem] top-1/2 w-24 h-[2px] bg-primary"></div>
            )}
          </div>
        ))}
      </div>
    
</SectionContainer>
  );
};

export default HowItWorks;
