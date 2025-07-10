import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../main";
import { FaSyncAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

const MySession = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ✅ Fetch tutor's own sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["mySessions", user?.email],
    queryFn: async () => {
      const res = await fetch(`/api/my-sessions?tutorEmail=${user?.email}`);
      return res.json();
    },
    enabled: !!user?.email,
  });

  // 🔁 Resend approval request (change status to "pending")
  const resendMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/update-session-status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "pending" }),
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success("Approval request sent again.");
      queryClient.invalidateQueries(["mySessions", user?.email]);
    },
    onError: () => toast.error("Failed to resend request."),
  });

  const handleResendRequest = (id) => {
    resendMutation.mutate(id);
  };

  if (isLoading) {
    return <div className="text-center text-lg">Loading sessions...</div>;
  }

  return (
    <div className="min-h-screen px-4 py-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">My Study Sessions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((session) => (
          <div key={session._id} className="card bg-base-100 shadow-md border">
            <div className="card-body space-y-3">
              <h3 className="card-title">{session.title}</h3>
              <p className="text-sm">{session.description?.slice(0, 120)}...</p>
              <div className="text-sm">
                <strong>Status: </strong>
                <span
                  className={`badge ${
                    session.status === "approved"
                      ? "badge-success"
                      : session.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {session.status}
                </span>
              </div>

              {/* Button for Rejected Sessions */}
              {session.status === "rejected" && (
                <button
                  onClick={() => handleResendRequest(session._id)}
                  className="btn btn-sm btn-outline btn-warning flex items-center gap-2 w-fit"
                >
                  <FaSyncAlt /> Resend Approval Request
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySession;
