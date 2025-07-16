import React from "react";
import { FaBookOpen, FaGraduationCap, FaExternalLinkAlt } from "react-icons/fa";
import SectionContainer from "../SectionContainer/SectionContainer";

const resources = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    level: "Beginner → Advanced",
    link: "#",
    description: "HTML, CSS, JavaScript, React, Node.js, MongoDB – learn to build full web apps from scratch.",
  },
  {
    id: 2,
    title: "UI/UX Design Path",
    level: "Beginner Friendly",
    link: "#",
    description: "Learn visual design, design systems, Figma, and user research through collaborative projects.",
  },
  {
    id: 3,
    title: "Data Science Bootcamp",
    level: "Intermediate",
    link: "#",
    description: "Master Python, Pandas, Machine Learning, and real-world data analysis in teams.",
  },
];

const ResourcesLearningPaths = () => {
  return (
    <SectionContainer>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">📚 Resources & Learning Paths</h2>
        <p className="text-base-content text-opacity-70 mt-2">
          Curated tracks to guide your collaborative learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {resources.map((res) => (
          <div
            key={res.id}
            className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="card-body space-y-3">
              <h3 className="card-title text-lg flex items-center gap-2">
                <FaBookOpen className="text-primary" />
                {res.title}
              </h3>
              <p className="text-sm flex items-center gap-2 text-base-content text-opacity-80">
                <FaGraduationCap className="text-secondary" /> {res.level}
              </p>
              <p className="text-sm text-base-content text-opacity-80">{res.description}</p>
              <div className="card-actions justify-end pt-2">
                <a
                  href={res.link}
                  className="btn btn-sm btn-outline btn-accent flex items-center gap-2"
                >
                  Explore
                  <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </SectionContainer>
  );
};

export default ResourcesLearningPaths;
