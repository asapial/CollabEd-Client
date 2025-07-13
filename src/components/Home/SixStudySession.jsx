import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBookOpen, FaClock, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router";
import useFetchApi from "../../Api/useFetchApi";

const SixStudySession = () => {
  const { getSixSessions } = useFetchApi();

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["approvedSessions"],
    queryFn: () => getSixSessions(),
  });

  // Filter only approved sessions and limit to 6
  const approvedSessions = sessions
    .filter((s) => s.status === "approved")
    .slice(0, 6);

  // Determine session status
  const getSessionStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    return now >= startDate && now <= endDate ? "Ongoing" : "Closed";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
        <FaBookOpen className="text-primary" />
        Available Study Sessions
      </h2>

      {isLoading ? (
        <p className="text-center">Loading sessions...</p>
      ) : approvedSessions.length === 0 ? (
        <p className="text-center">No approved sessions found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approvedSessions.map((session) => {
            const status = getSessionStatus(session.registrationStart, session.registrationEnd);
            return (
              <div key={session._id} className="card bg-base-100 shadow-md border">
                <div className="card-body space-y-3">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FaBookOpen className="text-primary" />
                    {session.title}
                  </h3>
                  <p className="line-clamp-4 text-sm">{session.description}</p>

                  <div className="flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-secondary" />
                    Reg: {session.registrationStart} to {session.registrationEnd}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <FaClock className="text-secondary" />
                    Status:
                    <span
                      className={`badge badge-outline ${
                        status === "Ongoing" ? "badge-success" : "badge-error"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="card-actions justify-end mt-3">
                    <Link to={`/session-details/${session._id}`} className="btn btn-sm btn-primary">
                      <FaInfoCircle className="mr-1" />
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SixStudySession;
