import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaCalendarCheck,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../../main";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Loading from "../../Others/Loading";

// Simulated fetch function
const fetchTutorOverview = async () => {
  return {
    name: "",
    totalStudents: 120,
    coursesTaught: 8,
    upcomingClasses: 3,
    performance: [
      { subject: "React", rating: 4.7 },
      { subject: "JavaScript", rating: 4.5 },
      { subject: "HTML/CSS", rating: 4.9 },
      { subject: "Node.js", rating: 4.6 },
    ],
  };
};

const TutorOverview = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["tutorOverview"],
    queryFn: fetchTutorOverview,
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <SectionContainer className=" customGradiant3 min-h-screen">
      {/* Welcome */}
      <h1 className="text-3xl lg:text-5xl font-bold text-center mb-6">
        Welcome, <span className="text-primary">{user?.displayName || data.name}</span>!
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="customGradiant2 p-5 boxCss flex items-center gap-5 ">
          <FaUsers className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Total Students</h3>
            <p className="text-3xl font-bold">{data.totalStudents}</p>
          </div>
        </div>

        <div className="customGradiant2 p-5 boxCss flex items-center gap-5 ">
          <FaBook className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Courses Taught</h3>
            <p className="text-3xl font-bold">{data.coursesTaught}</p>
          </div>
        </div>

        <div className="customGradiant2 p-5 boxCss flex items-center gap-5 ">
          <FaCalendarCheck className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Upcoming Classes</h3>
            <p className="text-3xl font-bold">{data.upcomingClasses}</p>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
        <div className="customGradiant2 px-5 boxCss py-10 ">
        <h2 className="text-3xl font-semibold mb-10 flex items-center justify-center gap-2">
          <FaChalkboardTeacher className="text-primary" />
          Course Performance Ratings
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.performance}>
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Bar dataKey="rating" fill="currentColor" className="text-primary" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionContainer>
  );
};

export default TutorOverview;
