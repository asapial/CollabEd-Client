import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUsersCog,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaChartPie,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import { AuthContext } from "../../../main";
import Loading from "../../Others/Loading";

// Fake API to simulate data
const fetchAdminOverview = async () => {
  return {
    totalUsers: 350,
    totalStudents: 250,
    totalTutors: 80,
    totalAdmins: 20,
    userDistribution: [
      { name: "Students", value: 250 },
      { name: "Tutors", value: 80 },
      { name: "Admins", value: 20 },
    ],
  };
};

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"]; // Tailwind-compatible colors

const AdminOverview = () => {
  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: fetchAdminOverview,
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <SectionContainer className="customGradiant3 min-h-screen">
      <h1 className="text-3xl lg:text-5xl font-bold text-center mb-6">
        Welcome Admin,{" "}
        <span className="text-primary">{user?.displayName || "Admin"}</span>
      </h1>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="customGradiant2 border-2 border-primary rounded-xl shadow-primary p-6 flex items-center gap-5 hover:shadow-sm transition duration-300 ">
          <FaUsersCog className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">{data.totalUsers}</p>
          </div>
        </div>

        <div className="customGradiant2 border-2 border-primary rounded-xl shadow-primary p-6 flex items-center gap-5 hover:shadow-sm transition duration-300 ">
          <FaUserGraduate className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Total Students</h3>
            <p className="text-3xl font-bold">{data.totalStudents}</p>
          </div>
        </div>

        <div className="customGradiant2 border-2 border-primary rounded-xl shadow-primary p-6 flex items-center gap-5 hover:shadow-sm transition duration-300 ">
          <FaChalkboardTeacher className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Total Tutors</h3>
            <p className="text-3xl font-bold">{data.totalTutors}</p>
          </div>
        </div>

        <div className="customGradiant2 border-2 border-primary rounded-xl shadow-primary p-6 flex items-center gap-5 hover:shadow-sm transition duration-300 ">
          <FaUserShield className="text-4xl text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Total Admins</h3>
            <p className="text-3xl font-bold">{data.totalAdmins}</p>
          </div>
        </div>
      </div>

      {/* Pie Chart for User Distribution */}
        <div className=" customGradiant2 rounded-2xl px-6 py-10 border-2 border-primary shadow-primary  hover:shadow-sm transition duration-300">
        <h2 className="text-3xl font-semibold mb-4 flex items-center justify-center gap-2 text-primary">
          <FaChartPie className="text-primary" />
          User Role Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.userDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.userDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </SectionContainer>
  );
};

export default AdminOverview;
