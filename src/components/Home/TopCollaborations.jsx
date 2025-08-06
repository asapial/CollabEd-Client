import React from "react";
import { FaUserFriends, FaStar, FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router";
import SectionContainer from "../SectionContainer/SectionContainer";
import { Typewriter } from "react-simple-typewriter";

const topSessions = [
  {
    _id: "1",
    title: "React Mastery Bootcamp",
    tutorName: "Abu Syeed",
    studentCount: 42,
    rating: 4.9,
    description:
      "This intensive React bootcamp focuses on mastering core concepts such as component architecture, hooks, context API, and performance optimization. Students will collaborate on real-world projects and participate in live coding sessions to gain practical experience and build production-ready applications.",
    bg1: "#FFF07D",
    bg2: "#E7C100",
  },
  {
    _id: "2",
    title: "Python for Data Science",
    tutorName: "Shahina Rahman",
    studentCount: 36,
    rating: 4.8,
    description:
      "Dive deep into data science with Python. This session covers data cleaning, analysis with Pandas and NumPy, data visualization with Matplotlib and Seaborn, and an introduction to machine learning using Scikit-learn. Perfect for beginners looking to enter the world of data.",
    bg1: "#C0FFA0",
    bg2: "#6AC33E",
  },
  {
    _id: "3",
    title: "UI/UX Design Crash Course",
    tutorName: "Nahid Hasan",
    studentCount: 28,
    rating: 4.7,
    description:
      "An immersive session for aspiring designers, covering the fundamentals of UI/UX, including user research, wireframing, visual hierarchy, and prototyping. Learn to use Figma efficiently and collaborate with developers to deliver beautiful and user-friendly interfaces.",
    bg1: "#82DBF7",
    bg2: "#179DC6",
  },
];

const TopCollaborations = () => {
  return (
    <SectionContainer className=" customGradiant2">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-primary">
          🌟 Top Collaborations
        </h2>
        <p className="text-primary text-lg text-opacity-70 mt-2">
          <Typewriter
            words={[
              "Explore popular collaborative learning experiences.",
              "Learn from top mentors.",
              "Grow your skills with the community.",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={500}
          />
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {topSessions.map((session) => (
<div
  key={session._id}
  className="card  text-black rounded-2xl transition-all duration-300"
  style={{
    backgroundColor: session.bg1,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.border = `1px solid ${session.bg2}`;
    e.currentTarget.style.boxShadow = `0 4px 12px ${session.bg2}`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.border = "";
    e.currentTarget.style.boxShadow = "";
  }}
>
            <div className="card-body space-y-3">
              <h3 className=" text-2xl flex justify-center items-center font-bold">
                {session.title}
              </h3>
              <p className="flex items-center gap-2  text-xl font-semibold">
                <FaChalkboardTeacher className="text-sky-400 " /> Tutor:{" "}
                {session.tutorName}
              </p>
              <p className="flex items-center gap-2  text-xl font-semibold">
                <FaUserFriends className="text-green-400  " /> Students:{" "}
                {session.studentCount}
              </p>
              <p className="flex items-center gap-2 text-xl font-semibold">
                <FaStar className="text-amber-400  " /> Rating: {session.rating}
              </p>
              <p className=" text text-justify text-base">
                {session.description}
              </p>
              <div className="card-actions justify-center pt-2">
                <Link
                  to={`/session/${session._id}`}
                  className="btn btn-wide "
                  style={{
                    backgroundColor: session.bg2,
                    border: "white",
                    color: "white",
                  }}
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
