import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import Lottie from "lottie-react";
import uploadAnim from "../../../assets/Animation/uploadMaterials.json";
import { AuthContext } from "../../../main";
import { useParams } from "react-router";
import useFetchApi from "../../../Api/useFetchApi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SuccessToast } from "../../../utils/ToastMaker";

const UploadMaterials = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { approvedSessions,uploadMaterials } = useFetchApi();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const { data: sessions = [] } = useQuery({
    queryKey: ["approvedSessions", user?.email],
    queryFn: () => approvedSessions(user?.email),
    enabled: !!user?.email,
  });

  const imgbbApiKey = "9f78c7ea3eb88b49292eb95698ec8282";

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const formImage = new FormData();
    formImage.append("image", imageFile);

    try {
      // 🖼️ Upload image to imgbb
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        formImage
      );
      const imageUrl = imgRes.data.data.url;

      // 📤 Prepare final payload
      const payload = {
        title: data.title,
        sessionId: data.sessionId,
        tutorEmail: data.tutorEmail,
        driveLink: data.driveLink,
        image: imageUrl,
      };

      // Send to your server
      // await fetch("/api/upload-material", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      uploadMaterials(payload).then(res=>{
        if(res.acknowledged){
          SuccessToast("Material uploaded successfully!");
        }
      })

      // reset();
      // ✅ Show toast or success message
      // console.log("Upload success");
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center shadow-xl bg-base-100 p-8 rounded-2xl">
        <div className="hidden md:block">
          <Lottie animationData={uploadAnim} loop={true} />
        </div>

        <div className="card w-full  p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center">Upload Study Materials</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Material title"
                className="input input-bordered w-full"
              />
              {errors.title && <p className="text-error text-sm mt-1">Title is required</p>}
            </div>

            {/* Study Session ID */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Study Session</span>
              </label>
              {id ? (
                <input
                  type="text"
                  readOnly
                  value={id}
                  {...register("sessionId")}
                  className="input input-bordered w-full bg-base-200"
                />
              ) : (
                <select
                  {...register("sessionId", { required: true })}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a session
                  </option>
                  {sessions.map((session) => (
                    <option key={session._id} value={session._id}>
                      {session.title} | {session._id}
                    </option>
                  ))}
                </select>
              )}
              {!id && errors.sessionId && (
                <p className="text-error text-sm mt-1">Session ID is required</p>
              )}
            </div>

            {/* Tutor Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tutor Email</span>
              </label>
              <input
                type="email"
                readOnly
                value={user?.email}
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
              {errors.image && (
                <p className="text-error text-sm mt-1">Image is required</p>
              )}
            </div>

            {/* Drive Link */}
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
              {errors.driveLink && (
                <p className="text-error text-sm mt-1">Drive link is required</p>
              )}
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

// https://drive.google.com/file/d/1jkmwPvwhtxR2DJdVgXsIy8HvEV7MSEtY/view?usp=sharing