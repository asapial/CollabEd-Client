import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBookOpen,
  FaClock,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useFetchApi from "../../Api/useFetchApi";
import Loading from "../../pages/Others/Loading";
import SectionContainer from "../SectionContainer/SectionContainer";

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

  console.log("Approved Sessions:", approvedSessions);

  return (
    <SectionContainer className="customGradiant1">

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3 text-primary">
        <FaBookOpen className="" />
        Available Study Sessions
      </h2>

      {isLoading ? (
        <Loading />
      ) : approvedSessions.length === 0 ? (
        <p className="text-center text-lg">No approved sessions found.</p>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {approvedSessions.map((session) => {
            const status = getSessionStatus(
              session.registrationStart,
              session.registrationEnd
            );

            return (
              <motion.div
                key={session._id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
                className=" border border-primary/25 hover:border-primary hover:shadow-primary shadow-sm transition-shadow duration-500 customGradiant2 rounded-2xl "
              >
                <div className="card-body space-y-3">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <FaBookOpen className="text-primary" />
                    {session.title}
                  </h3>

                  <p className="line-clamp-4 text-sm text-justify">{session.description}</p>

                  <div className="flex items-center gap-2 text-sm">
                    <FaCalendarAlt className="text-secondary" />
                    <span>
                      Reg:{" "}
                      <span className="font-medium">
                        {session.registrationStart}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {session.registrationEnd}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <FaClock className="text-secondary" />
                    Status:{" "}
                    <span
                      className={`badge badge-outline ${
                        status === "Ongoing" ? "badge-success" : "badge-error"
                      }`}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="card-actions justify-end pt-4">
                    <Link
                      to={`/sessionDetails/${session._id}`}
                      className="btn btn-sm btn-primary gap-2"
                    >
                      <FaInfoCircle />
                      Read More
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

    </SectionContainer>

  );
};

export default SixStudySession;
