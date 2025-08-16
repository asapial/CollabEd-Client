import React from "react";
import SectionContainer from "../SectionContainer/SectionContainer";

const LearningAchievements = () => {
  const achievements = [
    {
      id: 1,
      title: "1000+ Active Learners",
      description:
        "Students from around the globe actively engage in collaborative learning every day.",
      icon: "🎓",
    },
    {
      id: 2,
      title: "500+ Resources Shared",
      description:
        "A vast library of resources has been contributed by tutors and learners.",
      icon: "📚",
    },
    {
      id: 3,
      title: "300+ Successful Collaborations",
      description:
        "Learners have successfully collaborated in various live and recorded sessions.",
      icon: "🤝",
    },
    {
      id: 4,
      title: "95% Positive Feedback",
      description:
        "Most learners reported high satisfaction and improvement in their studies.",
      icon: "🌟",
    },
  ];

  return (
    <SectionContainer className=" customGradiant1">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-3">
            Learning Achievements
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Together, we’ve built a thriving learning community with impactful
            achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 shadow-xl hover:scale-105 transform transition-all duration-300"
            >
              <div className="card-body items-center text-center">
                <span className="text-5xl">{item.icon}</span>
                <h3 className="text-xl font-semibold mt-4 text-primary">
                  {item.title}
                </h3>
                <p className="text-base-content/70 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
    </SectionContainer>
  );
};

export default LearningAchievements;
