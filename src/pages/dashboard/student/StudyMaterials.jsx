import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaBook, FaTag, FaEnvelope, FaFileDownload } from "react-icons/fa";
import { AuthContext } from "../../../main";
import useFetchApi from "../../../Api/useFetchApi";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Loading from "../../Others/Loading";
import { motion } from "framer-motion";

const StudyMaterials = () => {
  const { user } = useContext(AuthContext);
  const { getStudentMaterials } = useFetchApi();

  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["studentMaterials", user?.email],
    queryFn: () => getStudentMaterials(user?.email),
    enabled: !!user?.email,
  });

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

  return (
    <SectionContainer className="bg-base-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 flex justify-center items-center gap-3">
        <FaBook className="text-primary" /> My Learning Materials
      </h2>

      {isLoading ? (
        <Loading />
      ) : materials.length === 0 ? (
        <p className="text-center text-base-content">
          No materials found. Join a session to receive study materials.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <motion.div
              key={material._id}
              className="card bg-base-100 border border-base-300 shadow-xl transition hover:shadow-2xl hover:scale-[1.01]"
              whileHover={{ scale: 1.01 }}
            >
              {/* Image */}
              <figure className="relative h-48 overflow-hidden rounded-t-xl group">
                <img
                  src={material.image}
                  alt={material.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Automatic Download Button */}
                <button
                  onClick={() => downloadImage(material.image, material.title)}
                  className="absolute top-2 right-2 bg-white/80 text-xs font-medium text-primary px-2 py-1 rounded hover:bg-primary hover:text-white transition"
                >
                  Download Image
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
      )}
    </SectionContainer>
  );
};

export default StudyMaterials;
