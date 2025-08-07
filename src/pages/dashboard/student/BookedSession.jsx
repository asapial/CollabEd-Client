import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBookReader, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../../main";
import useFetchApi from "../../../Api/useFetchApi";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import LoadingCenter from "../../Others/LoadingCenter";

const BookedSession = () => {
  const { user } = useContext(AuthContext);
  const { getMyBookedSessions } = useFetchApi();

  const { data: bookedSessions = [], isLoading } = useQuery({
    queryKey: ["myBookedSessions", user?.email],
    queryFn: () => getMyBookedSessions(user?.email),
    enabled: !!user?.email,
  });

  console.log(bookedSessions)

  return (
    <SectionContainer className=" customGradiant3 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 flex justify-center items-center gap-2 text-green-500">
        <FaBookReader className="" />
        My Booked Sessions
      </h2>

      {isLoading ? (
        <LoadingCenter></LoadingCenter>
      ) : bookedSessions.length === 0 ? (
        <p className="text-center">You haven't booked any sessions yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookedSessions.map((session) => (
            <div key={session._id} className="card  border-2 border-primary  customGradiant2 rounded-2xl hover:shadow-sm transition-shadow duration-500 ">
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
    </SectionContainer>
  );
};

export default BookedSession;
