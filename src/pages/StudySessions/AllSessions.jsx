import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaClock, FaInfoCircle } from "react-icons/fa";
import useFetchApi from "../../Api/useFetchApi";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import { Link } from "react-router";

const AllSessions = () => {
  const { getAllSessions } = useFetchApi();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["allApprovedSessions"],
    queryFn: () => getAllSessions(),
  });

  const getStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    return now >= startDate && now <= endDate ? "Ongoing" : "Closed";
  };

  return (
    <SectionContainer className="bg-base-300">
      <h2 className="text-3xl font-bold text-center mb-8">All Study Sessions</h2>

      {isLoading ? (
        <p className="text-center">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-center">No sessions available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <div key={session._id} className="card bg-base-100 border shadow">
              <div className="card-body space-y-3">
                <h3 className="text-xl font-bold">{session.title}</h3>
                <p className="text-sm line-clamp-4">{session.description}</p>

                <div className="flex items-center gap-2 text-sm opacity-70">
                  <FaCalendarAlt /> 
                  <span>From: {session.registrationStart}</span>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <FaCalendarAlt /> 
                  <span>To: {session.registrationEnd}</span>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`badge px-4 py-2 ${
                      getStatus(session.registrationStart, session.registrationEnd) === "Ongoing"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {getStatus(session.registrationStart, session.registrationEnd)}
                  </span>
                  <Link to={`/sessionDetails/${session._id}`}>
                                      <button className="btn btn-sm btn-outline flex items-center gap-2">
                    <FaInfoCircle /> Read More
                  </button>
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionContainer>
  );
};

export default AllSessions;
