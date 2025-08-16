import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBookOpen,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import useFetchApi from "../../Api/useFetchApi";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import Loading from "../Others/Loading";
import { Link } from "react-router";

const AllSessions = () => {
  const { getAllSessionsGeneral } = useFetchApi();
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("registrationStart"); // ✅ new
  const [order, setOrder] = useState("asc"); // ✅ new

  const { data, isLoading } = useQuery({
    queryKey: ["allApprovedSessions", currentPage, cardsPerPage, sortBy, order],
    queryFn: () => getAllSessionsGeneral(currentPage, cardsPerPage, sortBy, order),
    keepPreviousData: true,
  });

  const sessions = data?.sessions || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / cardsPerPage);

  const getStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    return now >= startDate && now <= endDate ? "Ongoing" : "Closed";
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  console.log("Sessions:", sessions);
  return (
    <SectionContainer className="customGradiant1 min-h-screen">
      <h2 className="flex items-center justify-center gap-3 text-4xl text-primary font-bold text-center mb-6">
        <FaBookOpen className="text-3xl text-primary drop-shadow-md" />
        All Study Sessions
      </h2>

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Card Per Page */}
        <select
          value={cardsPerPage}
          onChange={(e) => {
            setCardsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="select select-bordered w-40"
        >
          <option value="3">3 per page</option>
          <option value="6">6 per page</option>
          <option value="9">9 per page</option>
        </select>

        {/* Sort By */}
        <div className="flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered w-48"
          >
            <option value="registrationStart">Sort by Registration Date</option>
            <option value="classStart">Sort by Class Start Date</option>
          </select>

          {/* Order */}
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="select select-bordered w-36"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : sessions.length === 0 ? (
        <p className="text-center text-lg">No sessions available.</p>
      ) : (
        <>
          {/* Sessions Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="card customGradiant2 rounded-2xl border-2 border-primary shadow-primary hover:shadow-sm transition-shadow duration-300"
              >
                <div className="card-body space-y-4">
                  <h3 className="text-xl font-bold text-primary">
                    {session.title}
                  </h3>
                  <p className="text-sm line-clamp-4 text-justify">
                    {session.description}
                  </p>

                  <div className="text-sm opacity-70 space-y-1">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />{" "}
                      <span>Registration: {session.registrationStart} → {session.registrationEnd}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />{" "}
                      <span>Class : {session.classStart} →   {session.classStart}</span>
                    </div>
                  </div>
              
                  <div className="flex items-center justify-between pt-4">
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

          {/* Pagination */}
          <div className="mt-10 flex justify-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`btn btn-sm ${
                  currentPage === idx + 1 ? "btn-primary" : "btn-outline"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </SectionContainer>
  );
};

export default AllSessions;
