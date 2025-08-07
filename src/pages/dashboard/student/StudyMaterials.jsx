import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBook,
  FaTag,
  FaEnvelope,
  FaFileDownload,
  FaDownload,
} from "react-icons/fa";
import { AuthContext } from "../../../main";
import useFetchApi from "../../../Api/useFetchApi";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Loading from "../../Others/Loading";
import { motion } from "framer-motion";

const StudyMaterials = () => {
  const { user } = useContext(AuthContext);
  const { getStudentMaterials } = useFetchApi();
  const [selectedSession, setSelectedSession] = useState("");

  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["studentMaterials", user?.email],
    queryFn: () => getStudentMaterials(user?.email),
    enabled: !!user?.email,
  });

  // ✅ Extract unique session IDs
  const sessionIds = [...new Set(materials.map((m) => m.sessionId))];

  // ✅ Auto-select the first session if any data exists
  useEffect(() => {
    if (sessionIds.length > 0 && !selectedSession) {
      setSelectedSession(sessionIds[0]);
    }
  }, [sessionIds, selectedSession]);

  // ✅ Filter materials by selected session ID
  const filteredMaterials = selectedSession
    ? materials.filter((m) => m.sessionId === selectedSession)
    : [];

  // ✅ Image Download Function
  const downloadImage = async (url, filename = "material") => {
    try {
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${filename}.jpg`;
      a.click();

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  console.log(filteredMaterials);

  return (
    <SectionContainer className="customGradiant3 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-amber-500 mb-8 flex justify-center items-center gap-3">
        <FaBook /> My Learning Materials
      </h2>

      {isLoading ? (
        <Loading />
      ) : materials.length === 0 ? (
        <p className="text-center text-base-content">
          No materials found. Join a session to receive study materials.
        </p>
      ) : (
        <>
          {/* ✅ Dropdown for selecting session ID */}
          <div className="flex justify-center mb-8">
            <select
              onChange={(e) => setSelectedSession(e.target.value)}
              value={selectedSession}
              className="select select-primary w-full max-w-xs"
            >
              <option value="">Select a session</option>
              {sessionIds.map((id) => (
                <option key={id} value={id}>
                  Session: {id}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Show filtered materials */}
          {filteredMaterials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((material) => (
                <motion.div
                  key={material._id}
                  className="card customGradiant2 boxCss hover:scale-[1.01]"
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Image */}
                  <figure className="relative h-48 overflow-hidden rounded-t-xl group">
                    <img
                      src={material.image}
                      alt={material.title}
                      className="w-full h-full object-cover object-center"
                    />

                    <button
                      onClick={() =>
                        downloadImage(material.image, material.title)
                      }
                      className="absolute top-2 right-2 bg-white/80 text-xs font-medium text-primary px-2 py-1 rounded hover:bg-primary hover:text-white transition"
                    >
                      <FaDownload size={20}></FaDownload>
                    </button>
                  </figure>

                  {/* Content */}
                  <div className="card-body space-y-3">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-primary">
                      <FaTag /> {material.title}
                    </h3>

                    <p className="text-sm flex items-center gap-2 text-base-content/70">
                      <FaEnvelope className="text-secondary" /> Tutor:{" "}
                      {material.tutorEmail}
                    </p>

                    <a
                      href={material.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm btn-primary w-full flex justify-center items-center gap-2"
                    >
                      <FaFileDownload /> View Material
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : selectedSession ? (
            <p className="text-center text-base-content">
              No materials found for this session.
            </p>
          ) : null}
        </>
      )}
    </SectionContainer>
  );
};

export default StudyMaterials;
