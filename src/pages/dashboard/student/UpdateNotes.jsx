import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStickyNote, FaPen, FaSave } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../main";
import useFetchApi from "../../../Api/useFetchApi";
import { SuccessToast, ErrorToast } from "../../../utils/ToastMaker";
import { useParams } from "react-router";

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
      <div className="text-center py-10 text-xl font-semibold">Loading note...</div>
    );
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-6">
          <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <FaStickyNote /> Update Note
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                className="input input-bordered bg-base-200"
              />
            </div>

            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <FaPen /> Note Title
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter note title"
                {...register("title", { required: true })}
                className="input input-bordered"
              />
              {errors.title && (
                <span className="text-error text-sm mt-1">Title is required</span>
              )}
            </div>

            {/* Description (Textarea) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Note Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered min-h-[150px]"
                placeholder="Enter your note description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="btn btn-primary flex items-center gap-2 justify-center"
              >
                <FaSave /> {mutation.isLoading ? "Saving..." : "Save Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateNotes;
