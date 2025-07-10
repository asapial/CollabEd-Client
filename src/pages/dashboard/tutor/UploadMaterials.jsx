import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import Lottie from "lottie-react";
import uploadAnim from "../../../assets/Animation/uploadMaterials.json"; // Add your Lottie JSON file
import { AuthContext } from "../../../main";

const UploadMaterials = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [sessions, setSessions] = useState([]);

  // Fetch approved sessions of the tutor
  useEffect(() => {
    fetch(`/api/approved-sessions?tutorEmail=${user?.email}`)
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(console.error);
  }, [user?.email]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("sessionId", data.sessionId);
    formData.append("tutorEmail", data.tutorEmail);
    formData.append("driveLink", data.driveLink);
    formData.append("image", data.image[0]);

    fetch("/api/upload-material", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        reset();
        // Show success toast here
      });
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Lottie */}
        <div className="hidden md:block">
          <Lottie animationData={uploadAnim} loop={true} />
        </div>

        {/* Right Form */}
        <div className="card w-full shadow-xl bg-base-100 p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Upload Study Materials</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Material title"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && <p className="text-error text-sm mt-1">Title is required</p>}
            </div>

            {/* Study Session ID */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Study Session</span>
              </label>
              <select
                {...register("sessionId", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select a session</option>
                {sessions.map((session) => (
                  <option key={session._id} value={session._id}>
                    {session.title}
                  </option>
                ))}
              </select>
              {errors.sessionId && <p className="text-error text-sm mt-1">Session ID is required</p>}
            </div>

            {/* Tutor Email (Read-only) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tutor Email</span>
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                {...register("tutorEmail")}
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image (Resource)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="file-input file-input-bordered w-full"
              />
              {errors.image && <p className="text-error text-sm mt-1">Image is required</p>}
            </div>

            {/* Google Drive Link */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Google Drive Link</span>
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/..."
                {...register("driveLink", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.driveLink && <p className="text-error text-sm mt-1">Drive link is required</p>}
            </div>

            {/* Submit */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full flex gap-2 items-center justify-center">
                <FaUpload />
                Upload Material
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadMaterials;
