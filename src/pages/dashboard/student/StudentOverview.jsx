import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUserGraduate,
  FaBookOpen,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import { AuthContext } from "../../../main";
import { useContext } from "react";
import Loading from "../../Others/Loading";



const fetchOverviewData = async () => {
  // Simulate an API call — replace with real fetch when ready
  return {
    name: "John Doe",
    enrolledCourses: 5,
    completedAssignments: 12,
    upcomingExams: 2,
    performance: [
      { subject: "Math", score: 85 },
      { subject: "Physics", score: 78 },
      { subject: "Chemistry", score: 92 },
      { subject: "English", score: 74 },
    ],
  };
};

const StudentOverview = () => {
    const {user}=useContext(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["studentOverview"],
    queryFn: fetchOverviewData,
  });

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <SectionContainer>
      <h1 className="text-3xl lg:text-5xl font-bold text-center">
        Welcome Back, <span className="text-primary">{user?.displayName}</span>
      </h1>
      {/* Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
        {/* Enrolled Courses */}
        <div className="bg-base-200 rounded-xl shadow-primary shadow-sm p-6 flex items-center gap-5 hover:shadow-lg transition duration-300">
          <FaBookOpen className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Enrolled Courses</h3>
            <p className="text-3xl font-bold">{data.enrolledCourses}</p>
          </div>
        </div>

        {/* Assignments Completed */}
        <div className="bg-base-200 rounded-xl shadow-primary shadow-sm p-6 flex items-center gap-5 hover:shadow-lg transition duration-300">
          <FaClipboardList className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Assignments Completed</h3>
            <p className="text-3xl font-bold">{data.completedAssignments}</p>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-base-200 rounded-xl shadow-primary shadow-sm p-6 flex items-center gap-5 hover:shadow-lg transition duration-300">
          <FaChartBar className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Upcoming Exams</h3>
            <p className="text-3xl font-bold">{data.upcomingExams}</p>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-base-100 shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaUserGraduate className="text-primary" />
          Performance Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.performance}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="currentColor" className="text-primary" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    
    </SectionContainer>
  );
};

export default StudentOverview;
