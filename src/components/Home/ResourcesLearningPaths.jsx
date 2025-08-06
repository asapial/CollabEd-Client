import React from "react";
import { FaBookOpen, FaGraduationCap, FaExternalLinkAlt } from "react-icons/fa";
import SectionContainer from "../SectionContainer/SectionContainer";

const resources = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    level: "Beginner → Advanced",
    link: "#",
    description:
      "Dive deep into modern web development by mastering HTML for structure, CSS for styling, and JavaScript for interactivity. Progress to React for building dynamic frontends, Node.js for backend services, and MongoDB for database management. Gain hands-on experience creating complete, scalable web applications from scratch, preparing you for real-world projects and developer roles.",
  },
  {
    id: 2,
    title: "UI/UX Design Path",
    level: "Beginner Friendly",
    link: "#",
    description:
      "Explore the art and science of user interface and user experience design. Learn principles of visual hierarchy, color theory, and typography alongside practical skills in design systems and prototyping using Figma. Understand user research methods and usability testing by collaborating on projects that simulate real-world product design challenges.",
  },
  {
    id: 3,
    title: "Data Science Bootcamp",
    level: "Intermediate",
    link: "#",
    description:
      "Build expertise in data manipulation and analysis with Python and Pandas. Understand core machine learning algorithms and how to apply them to solve complex problems. Work on real datasets, perform exploratory data analysis, and collaborate on team projects that simulate industry workflows to prepare you for data-driven decision-making roles.",
  },
];


const ResourcesLearningPaths = () => {
  return (
    <SectionContainer className=" customGradiant3">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-secondary">📚 Resources & Learning Paths</h2>
        <p className="text-base-content text-opacity-70 mt-2">
          Curated tracks to guide your collaborative learning journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {resources.map((res) => (
          <div
            key={res.id}
            className="card bg-base-100 border border-secondary hover:shadow-md transition-all duration-300 rounded-2xl  shadow-secondary hover:border-2 "
          >
            <div className="card-body space-y-3">
              <h3 className="card-title text-lg flex items-center gap-2">
                <FaBookOpen className="text-primary" />
                {res.title}
              </h3>
              <p className="text-lg flex items-center gap-2 text-base-content text-opacity-80">
                <FaGraduationCap className="text-secondary" /> {res.level}
              </p>
              <p className="text-base text-base-content text-justify">
                {res.description}
              </p>
              <div className="card-actions justify-end pt-2">
                <a
                  className="btn btn-sm btn-outline btn-secondary flex items-center gap-2"
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
