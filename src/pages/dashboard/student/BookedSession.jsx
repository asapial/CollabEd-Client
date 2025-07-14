import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBookReader, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../../main";
import useFetchApi from "../../../Api/useFetchApi";

const BookedSession = () => {
  const { user } = useContext(AuthContext);
  const { getMyBookedSessions } = useFetchApi();

  const { data: bookedSessions = [], isLoading } = useQuery({
    queryKey: ["myBookedSessions", user?.email],
    queryFn: () => getMyBookedSessions(user?.email),
    enabled: !!user?.email,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-8 flex justify-center items-center gap-2">
        <FaBookReader className="text-primary" />
        My Booked Sessions
      </h2>

      {isLoading ? (
        <p className="text-center">Loading booked sessions...</p>
      ) : bookedSessions.length === 0 ? (
        <p className="text-center">You haven't booked any sessions yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedSessions.map((session) => (
            <div key={session._id} className="card bg-base-100 border shadow">
              <div className="card-body">
                <h3 className="text-xl font-semibold">{session.sessionTitle}</h3>
                <p className="text-sm opacity-70">
                  Tutor: <span className="font-medium">{session.tutorEmail}</span>
                </p>
                <div className="card-actions mt-4 justify-end">
                  <Link
                    to={`/sessionDetails/${session.sessionId}`}
                    className="btn btn-sm btn-primary flex items-center gap-1"
                  >
                    <FaInfoCircle /> View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedSession;
