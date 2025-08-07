import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../main";
import {
  FaCheckCircle,
  FaClock,
  FaSyncAlt,
  FaTimesCircle,
} from "react-icons/fa";
import useFetchApi from "../../../Api/useFetchApi";
import { ErrorToast, SuccessToast } from "../../../utils/ToastMaker";
import { Link } from "react-router";
import Loading from "../../Others/Loading";
import { MdOutlineMenuBook } from "react-icons/md";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
// import { toast } from "react-hot-toast";

const MySession = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { mySession, resendApprovalRequest } = useFetchApi();

  // ✅ Fetch tutor's own sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["mySessions", user?.email],
    queryFn: async () => {
      // const res = await fetch(`/api/my-sessions?tutorEmail=${user?.email}`);
      const res = await mySession(user?.email);
      console.log("Fetched Sessions:", res);
      return res;
    },
    enabled: !!user?.email,
  });

  // 🔁 Resend approval request (change status to "pending")

  const handleResendRequest = (id) => {
    resendApprovalRequest(id, user.email)
      .then((res) => {
        console.log("Resend Request Response:", res);
        if (res.modifiedCount > 0) {
          SuccessToast("Approval request resent successfully!");
          queryClient.invalidateQueries(["mySessions", user?.email]);
          // console.log("Approval request resent successfully!");
        } else {
          ErrorToast("Failed to resend approval request.");
          // console.error("Failed to resend approval request.");
        }
      })
      .catch((error) => {
        console.error("Error resending approval request:", error);
      });
  };

  console.log("My Sessions:", sessions);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <SectionContainer className=" customGradiant3 min-h-screen">
        <h2 className="text-4xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-purple-500">
          <MdOutlineMenuBook className="" />
          My Study Sessions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="card boxCss customGradiant2 "
            >
              <div className="card-body space-y-4">
                {/* Title */}
                <h3 className="card-title text-lg md:text-xl font-semibold">
                  <FaCheckCircle className="text-primary" />
                  <span>{session.title}</span>
                </h3>

                {/* Description */}
                <p className="text-sm text-base-content/80 leading-relaxed">
                  {session.description?.slice(0, 120)}...
                </p>

                {/* Status Badge */}
                <div className="text-sm font-medium flex items-center gap-2">
                  <span className="text-base-content/70">Status:</span>
                  <span
                    className={`badge px-3 py-1 text-sm capitalize ${
                      session.status === "approved"
                        ? "badge-success"
                        : session.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    } flex items-center gap-1`}
                  >
                    {session.status === "approved" && <FaCheckCircle />}
                    {session.status === "rejected" && <FaTimesCircle />}
                    {session.status === "pending" && <FaClock />}
                    {session.status}
                  </span>
                </div>

                {/* Rejection Reason + Feedback */}
                {session.status === "rejected" && (
                  <div className="bg-error/10 border border-error/20 rounded-lg p-4 space-y-2 text-sm text-error">
                    {session.rejectionReason && (
                      <div>
                        <strong>Reason:</strong> {session.rejectionReason}
                      </div>
                    )}
                    {session.rejectionFeedback && (
                      <div>
                        <strong>Feedback:</strong> {session.rejectionFeedback}
                      </div>
                    )}
                  </div>
                )}

                {/* Resend Request or Upload Materials */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {session.status === "rejected" && (
                    <button
                      onClick={() => handleResendRequest(session._id)}
                      className="btn btn-sm btn-outline btn-warning flex items-center gap-2"
                    >
                      <FaSyncAlt className="text-warning" />
                      Resend Approval Request
                    </button>
                  )}
                  {session.status === "approved" && (
                    <Link to={`/tutorDashboard/uploadMaterials/${session._id}`}>
                      <button className="btn btn-sm btn-outline btn-primary flex items-center gap-2 rounded-xl">
                        Upload Materials
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
    </SectionContainer>
  );
};

export default MySession;
