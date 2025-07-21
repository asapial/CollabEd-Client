import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useFetchApi from "../../../Api/useFetchApi";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { MdPendingActions, MdVerified } from "react-icons/md";
import Loading from "../../Others/Loading";
import { ErrorToast, SuccessToast } from "../../../utils/ToastMaker";

const ManageSessions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [amount, setAmount] = useState(0);
  const queryClient = useQueryClient();
  const { getAllSessions, approveSession, rejectSession, deleteSession } =
    useFetchApi();

  const [showRejectModal, setShowRejectModal] = useState(false);
const [rejectReason, setRejectReason] = useState("");
const [rejectFeedback, setRejectFeedback] = useState("");
const [rejectingSessionId, setRejectingSessionId] = useState(null);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ["allSessions"],
    queryFn: () => getAllSessions(),
  });

  const pendingSessions = sessions.filter((s) => s.status === "pending");
  const approvedSessions = sessions.filter((s) => s.status === "approved");

  const handleApproveClick = (session) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  const handleApproveSubmit = () => {
    const payload = {
      id: selectedSession._id,
      amount: isPaid ? amount : 0,
    };
    approveSession(payload)
      .then(() => {
        SuccessToast("Session approved");
        queryClient.invalidateQueries(["allSessions"]);
        setShowModal(false);
      })
      .catch(() => ErrorToast("Failed to approve"));
  };

  const handleReject = (id) => {
  setRejectingSessionId(id);
  setShowRejectModal(true);
};

const handleRejectSubmit = () => {
  const payload = {
    reason: rejectReason,
    feedback: rejectFeedback,
  };

  rejectSession(rejectingSessionId, payload)
    .then(() => {
      SuccessToast("Session rejected with feedback");
      queryClient.invalidateQueries(["allSessions"]);
      setShowRejectModal(false);
      setRejectFeedback("");
      setRejectReason("");
      setRejectingSessionId(null);
    })
    .catch(() => ErrorToast("Failed to reject session"));
};


  const handleDelete = (id) => {
    deleteSession(id)
      .then(() => {
        SuccessToast("Session deleted");
        queryClient.invalidateQueries(["allSessions"]);
      })
      .catch(() => ErrorToast("Failed to delete"));
  };

  if(isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-6">Manage Sessions</h2>

      <Tabs>
        <TabList className="flex justify-center gap-4 mb-6">
          <Tab className="tab tab-bordered text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:bg-base-200 react-tabs__tab">
            <MdPendingActions className="text-lg text-warning" />
            <span>Pending Sessions</span>
          </Tab>
          <Tab className="tab tab-bordered text-sm font-semibold flex items-center gap-2 transition-all duration-200 hover:bg-base-200 react-tabs__tab">
            <MdVerified className="text-lg text-success" />
            <span>Approved Sessions</span>
          </Tab>
        </TabList>

        {/* Pending Sessions */}
        <TabPanel>
          {pendingSessions.length === 0 ? (
            <p className="text-center text-base-content/70">
              No pending sessions.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingSessions.map((session) => (
                <div
                  key={session._id}
                  className="card bg-base-100 shadow border border-base-300"
                >
                  <div className="card-body space-y-3">
                    <h3 className="text-lg font-semibold">{session.title}</h3>
                    <p className="text-base-content/80 line-clamp-3">
                      {session.description}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApproveClick(session)}
                        className="btn btn-sm btn-success"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(session._id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabPanel>

        {/* Approved Sessions */}
        <TabPanel>
          {approvedSessions.length === 0 ? (
            <p className="text-center text-base-content/70">
              No approved sessions.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedSessions.map((session) => (
                <div
                  key={session._id}
                  className="card bg-base-100 shadow border border-base-300"
                >
                  <div className="card-body space-y-3">
                    <h3 className="text-lg font-semibold">{session.title}</h3>
                    <p className="text-base-content/80 line-clamp-3">
                      {session.description}
                    </p>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-primary">Update</button>
                      <button
                        onClick={() => handleDelete(session._id)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabPanel>
      </Tabs>

      {/* Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box space-y-4">
            <h3 className="font-bold text-lg">Approve Session</h3>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Is this session paid?</span>
              </label>
              <select
                className="select select-bordered"
                value={isPaid ? "paid" : "free"}
                onChange={(e) => setIsPaid(e.target.value === "paid")}
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {isPaid && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Amount</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            )}

            <div className="modal-action">
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={handleApproveSubmit} className="btn btn-success">
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

{showRejectModal && (
  <div className="modal modal-open z-50">
    <div className="modal-box rounded-xl border border-error shadow-lg bg-base-100 max-w-xl w-full">
      <h3 className="text-xl font-bold text-error flex items-center gap-2">
        <svg
          className="w-6 h-6 text-error"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"
          />
        </svg>
        Reject Session
      </h3>

      <p className="text-sm text-base-content/70 mb-4">
        Please provide a reason and optional feedback for rejecting this session.
      </p>

      {/* Rejection Reason */}
      <div className="form-control w-full">
        <label className="label font-medium">
          <span className="label-text">Rejection Reason<span className="text-error">*</span></span>
        </label>
        <input
          type="text"
          className="input input-bordered input-error focus:outline-none focus:ring-2 focus:ring-error/50 transition"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="e.g., Incomplete session details"
          required
        />
      </div>

      {/* Feedback */}
      <div className="form-control w-full mt-4">
        <label className="label font-medium">
          <span className="label-text">Feedback (optional)</span>
        </label>
        <textarea
          className="textarea textarea-bordered focus:outline-none focus:ring-2 focus:ring-primary/40 transition min-h-[100px]"
          value={rejectFeedback}
          onChange={(e) => setRejectFeedback(e.target.value)}
          placeholder="e.g., Please include more specific objectives for the session."
        ></textarea>
      </div>

      {/* Actions */}
      <div className="modal-action mt-6 flex justify-end gap-3">
        <button
          onClick={() => {
            setShowRejectModal(false);
            setRejectFeedback("");
            setRejectReason("");
            setRejectingSessionId(null);
          }}
          className="btn btn-ghost border border-base-300 hover:bg-base-200 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleRejectSubmit}
          className="btn btn-error shadow-md hover:shadow-xl transition-all duration-300"
        >
          Submit Rejection
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default ManageSessions;
