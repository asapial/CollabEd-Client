import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaStickyNote, FaPen, FaSave } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../main";
import useFetchApi from "../../../Api/useFetchApi";
import { SuccessToast, ErrorToast } from "../../../utils/ToastMaker";

const CreateNote = () => {
  const { user } = useContext(AuthContext);
  const { createNote } = useFetchApi();
  const queryClient = useQueryClient();

  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: (noteData) => createNote(noteData, user.email),
    onSuccess: () => {
      SuccessToast("Note created successfully");
      queryClient.invalidateQueries(["notes"]);
      reset();
      setDescription("");
    },
    onError: () => ErrorToast("Failed to create note"),
  });

  const onSubmit = (data) => {
    if (!description.trim()) {
      ErrorToast("Please enter a note description");
      return;
    }

    mutation.mutate({
      email: user?.email,
      title: data.title,
      description,
    });
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-10">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body space-y-6">
          <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <FaStickyNote /> Create a Note
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
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

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Note Description</span>
              </label>
              <textarea
                placeholder="Write your note description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered min-h-[150px]"
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

export default CreateNote;
