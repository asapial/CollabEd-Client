import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useFetchApi from "../../../Api/useFetchApi";
import { FaExternalLinkAlt, FaFolderOpen } from "react-icons/fa";
import Loading from "../../Others/Loading";
import { AuthContext } from "../../../main";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

const ViewMaterials = () => {
    const { user } = useContext(AuthContext);
  const { getAllMaterials } = useFetchApi();

  const { data: materials = [], isLoading } = useQuery({
       queryKey: ["allMaterials", user?.email],
    queryFn: async () => {
      const res = await getAllMaterials(user?.email);

      return res;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loading></Loading>
  }

  console.log(materials)

  return (
<SectionContainer className=" customGradiant3 min-h-screen">
      <h2 className="text-4xl text-amber-500 font-bold text-center mb-8 flex justify-center items-center gap-2">
        <FaFolderOpen className="" /> Study Materials
      </h2>

      {materials.length === 0 ? (
        <p className="text-center text-base-content/70">No materials uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material._id}
              className="card customGradiant2 boxCss"
            >
              <figure>
                <img
                  src={material.image}
                  alt={material.title}
                  className="w-full h-52 object-cover"
                />
              </figure>
              <div className="card-body space-y-3">
                <h3 className="card-title text-lg md:text-xl">{material.title}</h3>
                <p className="text-sm text-base-content/70">
                  <span className="font-semibold">Session ID:</span> {material.sessionId}
                </p>
                <div className="mt-2">
                  <a
                    href={material.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline btn-primary w-full flex items-center justify-center gap-2 rounded-xl"
                  >
                    <FaExternalLinkAlt /> View on Google Drive
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    
</SectionContainer>
  );
};

export default ViewMaterials;
