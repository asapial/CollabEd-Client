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
import { motion } from "framer-motion";
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
  const {
    getSessionById,
    getSessionReviews,
    bookSession,
    postReview,
    checkBooked,
  } = useFetchApi();
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

  const { data: isBooked = [] } = useQuery({
    queryKey: ["isBookedData", user?.email],
    queryFn: () => checkBooked(user?.email, id),
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
    <SectionContainer className="customGradiant1 min-h-screen py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card bg-base-100  border-2 border-primary rounded-2xl p-5 shadow-primary hover:shadow-sm transition-shadow duration-500  "
      >
        <div className="card-body space-y-6">
          <h2 className="text-4xl font-bold flex gap-2 items-center justify-center text-primary">
            <FaBookOpen /> {session.title}
          </h2>

          <div className="space-y-2 text-base">
            <p className="flex gap-2 items-center text-base-content">
              <FaUser /> <span className="font-medium">Tutor:</span>{" "}
              {session.tutorName}
            </p>
            <p className="flex gap-2 items-center">
              <FaStar className="text-warning" />
              <span className="font-medium">Average Rating:</span> 4.5 (mocked)
            </p>
          </div>

          <p className="text-justify text-lg ">
            {session.description}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5 text-base">
            <p className="flex items-center gap-2">
              <FaCalendarAlt />{" "}
              <span className="font-medium">Registration:</span>{" "}
              {session.registrationStart} → {session.registrationEnd}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt /> <span className="font-medium">Class:</span>{" "}
              {session.classStart} → {session.classEnd}
            </p>
            <p className="flex items-center gap-2">
              <FaCalendarAlt /> <span className="font-medium">Duration:</span>{" "}
              {session.duration}
            </p>
            <p className="flex items-center gap-2">
              <FaMoneyBillWave />
              <span className="font-medium">Fee:</span>{" "}
              {parseFloat(session.registrationFee) > 0
                ? `$${session.registrationFee}`
                : "Free"}
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={handleBooking}
              disabled={
                !isRegistrationOpen || isBooked || user?.userRole !== "Student"
              }
              className={`btn w-full sm:w-auto ${
                isBooked
                  ? "btn-outline btn-disabled text-gray-400"
                  : isRegistrationOpen
                  ? "btn-primary"
                  : "btn-disabled"
              }`}
            >
              {isBooked
                ? "✅ Already Booked"
                : isRegistrationOpen
                ? "📅 Book Now"
                : "❌ Registration Closed"}
            </button>
          </div>

          {/* ⭐ Review Form */}
          <div className="mt-8">
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <h4 className="text-lg font-semibold">📝 Leave a Review</h4>

              <div className="grid md:grid-cols-1 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Rating (1–5)</span>
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
                    <span className="label-text font-bold">Your Comment</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>

              <button
                className="btn btn-primary flex items-center gap-2 mt-2"
                type="submit"
              >
                <FaPaperPlane /> Submit Review
              </button>
            </form>
          </div>

          {/* 💬 Reviews */}
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">💬 Student Reviews</h3>
            {reviews.length === 0 ? (
              <p className="opacity-70">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) =>
                  review.review || review.rating ? (
                    <div
                      key={review._id}
                      className="p-4 border border-base-300 rounded-lg bg-base-100"
                    >
                      <p className="font-semibold text-sm">
                        {review.studentEmail}
                      </p>
                      <p className="text-sm text-warning">
                        Rating: {review.rating} / 5
                      </p>
                      <p className="text-sm opacity-90">{review.review}</p>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
};

export default SessionDetails;
