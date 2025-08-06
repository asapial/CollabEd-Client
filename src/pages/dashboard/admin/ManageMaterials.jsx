import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaFolderOpen, FaTrashAlt } from "react-icons/fa";
import useFetchApi from "../../../Api/useFetchApi";
import { SuccessToast, ErrorToast } from "../../../utils/ToastMaker";
import { AuthContext } from "../../../main";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import LoadingCenter from "../../Others/LoadingCenter";

const ManageMaterials = () => {
  const queryClient = useQueryClient();
  const { getAllMaterialsAdmin, deleteMaterial } = useFetchApi();
  const { user } = useContext(AuthContext);

  // Fetch all materials
  const { data: materials = [], isLoading } = useQuery({
    queryKey: ["materials"],
    queryFn: () => getAllMaterialsAdmin(user.email),
  });

  // Mutation for delete
  const mutation = useMutation({
    mutationFn: (id) => deleteMaterial(id, user.email),
    onSuccess: () => {
      queryClient.invalidateQueries(["materials"]);
      SuccessToast("Material removed successfully");
    },
    onError: () => ErrorToast("Failed to remove material"),
  });

  const handleRemove = (id) => {
    mutation.mutate(id);
  };

  return (
    <SectionContainer className=" customGradiant3 min-h-screen">

        <h2 className="text-4xl font-bold text-center mb-6 flex justify-center items-center gap-5 text-amber-500 ">
          {" "}
          <FaFolderOpen />
          Manage Materials
        </h2>

        <div className="overflow-x-auto rounded-2xl border-2 border-primary">
          <table className="table table-zebra bg-base-100 rounded-box">
            {/* Head */}
            <thead>
              <tr className="text-base-content/70">
                <th>Sl</th>
                <th>Material</th>
                <th>Drive Link</th>
                <th>Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    <LoadingCenter></LoadingCenter>
                  </td>
                </tr>
              ) : materials.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    No materials found.
                  </td>
                </tr>
              ) : (
                materials.map((material, index) => (
                  <tr key={material._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={material.image}
                              alt={material.title}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{material.title}</div>
                          <div className="text-sm opacity-60">
                            {material.tutorEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href={material.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="link link-hover text-sm text-primary"
                      >
                        View Drive File
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline btn-error"
                        onClick={() => handleRemove(material._id)}
                      >
                        <FaTrashAlt className="mr-1" /> Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* Footer */}
            <tfoot>
              <tr>
                <th></th>
                <th>Material</th>
                <th>Drive Link</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
    </SectionContainer>
  );
};

export default ManageMaterials;
