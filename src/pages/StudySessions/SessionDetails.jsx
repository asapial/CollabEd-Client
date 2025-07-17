import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaCalendarAlt,
  FaBookOpen,
  FaMoneyBillWave,
  FaUser,
  FaStar,
  FaPaperPlane,
} from "react-icons/fa";
import { AuthContext } from "../../main";
import useFetchApi from "../../Api/useFetchApi";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import Loading from "../Others/Loading";
import { SuccessToast, ErrorToast } from "../../utils/ToastMaker";

const SessionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const { getSessionById, getSessionReviews, bookSession, postReview } =
    useFetchApi();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

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
  const isRegistrationOpen =
    currentDate >= registrationStart && currentDate <= registrationEnd;

  const handleBooking = () => {
    if (parseFloat(session?.registrationFee) > 0) {
      navigate(`/payment/${session._id}`);
    } else {
      bookSession({
        studentEmail: user.email,
        tutorEmail: session.tutorEmail,
        sessionId: session._id,
        sessionTitle: session.title,
      }).then((data) => {
        if (data.acknowledged) {
          SuccessToast("Session booked successfully!");
        }
      });
    }
  };

  // REVIEW SUBMIT
  const reviewMutation = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      SuccessToast("Review posted");
      setComment("");
      setRating(0);
      queryClient.invalidateQueries(["sessionReviews", id]);
    },
    onError: () => ErrorToast("Failed to post review"),
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment) return ErrorToast("Fill both fields");
    reviewMutation.mutate({
      reviewerEmail: user.email,
      comment,
      rating,
      sessionId: id,
    });
  };

  if (loadingSession) return <Loading />;

  return (
    <SectionContainer className="bg-base-300 min-h-screen">
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
              <FaCalendarAlt /> Registration: {session.registrationStart} to{" "}
              {session.registrationEnd}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt /> Class: {session.classStart} to{" "}
              {session.classEnd}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt /> Duration: {session.duration}
            </p>
            <p className="flex items-center gap-2">
              <FaMoneyBillWave /> Fee:{" "}
              {parseFloat(session.registrationFee) > 0
                ? `$${session.registrationFee}`
                : "Free"}
              {/* <FaMoneyBillWave /> Fee: {session.registrationFee} */}
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
            {/* ⭐ Review Input Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <h4 className="text-lg font-semibold">Leave a Review</h4>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rating (1-5)</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="input input-bordered"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Comment</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button
                className="btn btn-accent flex items-center gap-2"
                type="submit"
              >
                <FaPaperPlane /> Submit Review
              </button>
            </form>

            <h3 className="text-xl font-bold mb-4">Student Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews available.</p>
            ) : (
              <div className="space-y-4 mb-6">
                {reviews.map((review) => {
                  if (review.review || review.rating) {
                    return (
                      <div key={review._id} className="p-4 border rounded-md">
                        <p className="font-semibold">{review.studentEmail}</p>
                        <p className="text-sm">Rating: {review.rating} / 5</p>
                        <p>{review.review}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default SessionDetails;
