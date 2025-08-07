import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStickyNote, FaPen, FaSave, FaEnvelope, FaRegStickyNote } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../main";
import useFetchApi from "../../../Api/useFetchApi";
import { SuccessToast, ErrorToast } from "../../../utils/ToastMaker";
import { useParams } from "react-router";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Loading from "../../Others/Loading";

const UpdateNotes = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { getNoteById, updateNoteById } = useFetchApi();
  const queryClient = useQueryClient();

  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch the existing note data
  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNoteById(id, user.email),
    enabled: !!id,
  });

  // Set form fields and description when note is loaded
  useEffect(() => {
    if (note) {
      setValue("title", note.title);
      setDescription(note.description);
    }
  }, [note, setValue]);

  const mutation = useMutation({
    mutationFn: (updatedData) => updateNoteById(id, updatedData, user.email),
    onSuccess: (res) => {
      if (res.modifiedCount > 0) {
        SuccessToast("Note updated successfully");
        queryClient.invalidateQueries(["note", id]);
      } else {
        ErrorToast("No changes made");
      }
    },
    onError: () => ErrorToast("Failed to update note"),
  });

  const onSubmit = (data) => {
    if (!description.trim()) {
      ErrorToast("Note description cannot be empty");
      return;
    }

    mutation.mutate({
      title: data.title,
      description,
    });
  };

  if (isLoading) {
    return (
<Loading></Loading>
    );
  }

  return (
    <SectionContainer className=" customGradiant3 min-h-screen">
        <div className="card bg-base-100 shadow-xl rounded-2xl border-2 border-primary">
        <div className="card-body space-y-6">
                   <h2 className="text-4xl font-bold text-center text-purple-500 flex items-center justify-center gap-2">
            <FaStickyNote /> Update Note
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email (readonly) */}
              <div className="form-control flex flex-col gap-2">
                <label className="label font-semibold text-base-content">
                  <span className="label-text flex justify-center items-center gap-2">
                    {" "}
                    <FaEnvelope className=" text-primary"></FaEnvelope>Your
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary cursor-not-allowed w-full"
                />
              </div>

              {/* Title */}
              <div className="form-control flex flex-col gap-2">
                <label className="label font-semibold text-base-content">
                  <span className="label-text flex items-center gap-2">
                    <FaPen className="text-primary" />
                    Note Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a descriptive note title"
                  {...register("title", { required: true })}
                  className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary w-full"
                />
                {errors.title && (
                  <span className="text-error text-sm mt-1">
                    Title is required
                  </span>
                )}
              </div>
            </div>


            {/* Description (Textarea) */}
            <div className="form-control flex flex-col gap-2">
              <label className="label font-semibold text-base-content">
                <span className="label-text flex items-center gap-2">
                  <FaRegStickyNote className="text-lg text-primary" />
                  Note Description
                </span>
              </label>
              <textarea
                placeholder="Write your note description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary w-full"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="btn btn-primary w-full text-white font-semibold text-lg py-2 rounded-xl shadow-md hover:shadow-lg transition duration-200 ease-in-out"
              >
                <FaSave /> {mutation.isLoading ? "Saving..." : "Save Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionContainer>
  );
};

export default UpdateNotes;
