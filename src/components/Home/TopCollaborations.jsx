import React from "react";
import { FaUserFriends, FaStar, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router";
import SectionContainer from "../SectionContainer/SectionContainer";

const topSessions = [
  {
    _id: "1",
    title: "React Mastery Bootcamp",
    tutorName: "Abu Syeed",
    studentCount: 42,
    rating: 4.9,
    description: "A hands-on React collaboration session with real-world projects and live coding experience."
  },
  {
    _id: "2",
    title: "Python for Data Science",
    tutorName: "Shahina Rahman",
    studentCount: 36,
    rating: 4.8,
    description: "Learn data analysis and machine learning basics with Python in a highly interactive format."
  },
  {
    _id: "3",
    title: "UI/UX Design Crash Course",
    tutorName: "Nahid Hasan",
    studentCount: 28,
    rating: 4.7,
    description: "Collaboration session on design principles, prototyping tools, and UI kits using Figma."
  },
];

const TopCollaborations = () => {
  return (
    <SectionContainer className="bg-base-200">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">🌟 Top Collaborations</h2>
        <p className="text-base-content text-opacity-70 mt-2">
          Explore popular collaborative learning experiences hosted by top mentors.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {topSessions.map((session) => (
          <div
            key={session._id}
            className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="card-body space-y-3">
              <h3 className="card-title text-xl">{session.title}</h3>
              <p className="flex items-center gap-2 text-sm text-base-content text-opacity-80">
                <FaChalkboardTeacher className="text-primary" /> Tutor: {session.tutorName}
              </p>
              <p className="flex items-center gap-2 text-sm text-base-content text-opacity-80">
                <FaUserFriends className="text-secondary" /> Students: {session.studentCount}
              </p>
              <p className="flex items-center gap-2 text-sm text-base-content text-opacity-80">
                <FaStar className="text-warning" /> Rating: {session.rating}
              </p>
              <p className="text-sm text-base-content">{session.description}</p>
              <div className="card-actions justify-end pt-2">
                <Link
                  to={`/session/${session._id}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    
    </SectionContainer>
  );
};

export default TopCollaborations;
