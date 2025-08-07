import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaStickyNote,
  FaPen,
  FaSave,
  FaEnvelope,
  FaRegStickyNote,
} from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../main";
import useFetchApi from "../../../Api/useFetchApi";
import { SuccessToast, ErrorToast } from "../../../utils/ToastMaker";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

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
    <SectionContainer className=" customGradiant3 min-h-screen">
      <div className="card bg-base-100 shadow-xl rounded-2xl border-2 border-primary">
        <div className="card-body space-y-6">
          <h2 className="text-4xl font-bold text-center text-purple-500 flex items-center justify-center gap-2">
            <FaStickyNote /> Create a Note
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6  p-8 rounded-2xl "
          >
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

            {/* Description */}
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
            <div className="form-control pt-4">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="btn btn-primary w-full text-white font-semibold text-lg py-2 rounded-xl shadow-md hover:shadow-lg transition duration-200 ease-in-out"
              >
                <FaSave className="mr-2" />
                {mutation.isLoading ? "Saving..." : "Save Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionContainer>
  );
};

export default CreateNote;
