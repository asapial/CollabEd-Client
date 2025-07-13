// Frontend: SessionDetails.jsx
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaCalendarAlt, FaBookOpen, FaMoneyBillWave, FaUser, FaStar } from "react-icons/fa";
import { AuthContext } from "../../main";
import useFetchApi from "../../Api/useFetchApi";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import Loading from "../Others/Loading";
import { SuccessToast } from "../../utils/ToastMaker";

const SessionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { getSessionById, getSessionReviews, bookSession } = useFetchApi();

  const { data: session, isLoading: loadingSession } = useQuery({
    queryKey: ["session", id],
    queryFn: () => getSessionById(id),
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["sessionReviews", id],
    queryFn: () => getSessionReviews(id),
  });

  const currentDate = new Date();
  const registrationStart = new Date(session?.registrationStart);
  const registrationEnd = new Date(session?.registrationEnd);
  const isRegistrationOpen = currentDate >= registrationStart && currentDate <= registrationEnd;

  const handleBooking = () => {
    if (parseFloat(session?.registrationFee) > 0) {
      navigate(`/payment/${session._id}`);
    } else {
      bookSession({
        studentEmail: user.email,
        tutorEmail: session.tutorEmail,
        sessionId: session._id,
        sessionTitle: session.title,
        review: "",
        rating: 0,
      }).then(data=>{
        if(data.acknowledged){
          SuccessToast("Session booked successfully!");
        //   navigate("/dashboard/student/bookedSession");
        }
      });
    }
  };

  if (loadingSession) return <Loading></Loading>

  return (
    <SectionContainer className=" bg-base-300 min-h-screen">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-4">
          <h2 className="text-3xl font-bold flex gap-2 items-center">
            <FaBookOpen /> {session.title}
          </h2>
          <p className="flex gap-2 items-center">
            <FaUser /> Tutor: {session.tutorName}
          </p>
          <p className="flex gap-2 items-center">
            <FaStar className="text-warning" /> Average Rating: 4.5 (mocked)
          </p>
          <p className="text-justify">{session.description}</p>

          <div className="grid md:grid-cols-2 gap-4">
            <p className="flex items-center gap-2">
              <FaCalendarAlt /> Registration: {session.registrationStart} to {session.registrationEnd}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt /> Class: {session.classStart} to {session.classEnd}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt /> Duration: {session.duration}
            </p>
            <p className="flex items-center gap-2">
              <FaMoneyBillWave /> Fee: {parseFloat(session.registrationFee) > 0 ? `$${session.registrationFee}` : "Free"}
            </p>
          </div>

          <div className="mt-4">
            <button
              className="btn btn-primary"
              onClick={handleBooking}
              disabled={!isRegistrationOpen}
            >
              {isRegistrationOpen ? "Book Now" : "Registration Closed"}
            </button>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">Student Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews available.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review._id} className="p-4 border rounded-md">
                    <p className="font-semibold">{review.reviewerEmail}</p>
                    <p className="text-sm">Rating: {review.rating} / 5</p>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    
    </SectionContainer>
  );
};

export default SessionDetails;
