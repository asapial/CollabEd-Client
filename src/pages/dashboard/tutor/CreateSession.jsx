import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import sessionAnim from "../../../assets/Animation/createSession.json";
import {
  FaChalkboard,
  FaCalendarAlt,
  FaRegClock,
  FaUserAlt,
  FaEnvelope,
  FaInfoCircle,
  FaDollarSign,
  FaCheckCircle,
} from "react-icons/fa";
import { AuthContext } from "../../../main";
import useFetchApi from "../../../Api/useFetchApi";
import { SuccessToast } from "../../../utils/ToastMaker";

const CreateSession = () => {
  const { user } = useContext(AuthContext);
  const {createSession}=useFetchApi();
// const user=null;
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const sessionData = {
      ...data,
      // registrationFee: 0,
      status: "pending",
    };

    console.log("Session Data:", sessionData);
    createSession(user.email,sessionData).then((res)=>{
      console.log("Session Created:", res);
      if(res.acknowledged){
        SuccessToast("Session Created Successfully!");
      }
    })
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-10 items-start gap-6 shadow-primary shadow-sm  bg-base-100 p-8 rounded-2xl">
        {/* Lottie - 30% */}
        <div className="flex justify-center items-center md:col-span-3 h-full">
          <div className="">
            <Lottie animationData={sessionAnim} loop={true} />
          </div>
        </div>

        {/* Form - 70% */}

        <div className="card w-full md:col-span-7 p-6  rounded-xl">
          <h2 className="text-3xl font-bold text-center mb-8 tracking-tight">
            Create Study Session
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Session Title */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaChalkboard className="text-lg" />
                  Session Title
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. Advanced JavaScript"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Tutor Name */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaUserAlt className="text-sm" />
                  Tutor Name
                </span>
              </label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                {...register("tutorName")}
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            {/* Tutor Email */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaEnvelope className="text-sm" />
                  Tutor Email
                </span>
              </label>
              <input
                type="email"
                value={user?.email}
                readOnly
                {...register("tutorEmail")}
                className="input input-bordered w-full bg-base-200"
              />
            </div>

            {/* Description */}
            <div className="form-control md:col-span-2">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaInfoCircle className="text-sm" />
                  Session Description
                </span>
              </label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                placeholder="Write a short description about the session..."
                className="textarea textarea-bordered w-full resize-none"
              />
            </div>

            {/* Registration Start */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaCalendarAlt className="text-sm" />
                  Registration Start
                </span>
              </label>
              <input
                type="date"
                {...register("registrationStart")}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            {/* Registration End */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaCalendarAlt className="text-sm" />
                  Registration End
                </span>
              </label>
              <input
                type="date"
                {...register("registrationEnd")}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            {/* Class Start */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaCalendarAlt className="text-sm" />
                  Class Start
                </span>
              </label>
              <input
                type="date"
                {...register("classStart")}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            {/* Class End */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaCalendarAlt className="text-sm" />
                  Class End
                </span>
              </label>
              <input
                type="date"
                {...register("classEnd")}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            {/* Duration */}
            <div className="form-control ">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaRegClock className="text-base" />
                  Session Duration
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. 4 Weeks, 8 Classes"
                {...register("duration")}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            {/* Registration Fee */}
            <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaDollarSign className="text-sm" />
                  Registration Fee
                </span>
              </label>
              <input
                type="number"
                value={0}
                readOnly
                {...register("registrationFee")}
                className="input input-bordered bg-base-200 w-full"
              />
            </div>

            {/* Status */}
            {/* <div className="form-control">
              <label className="label font-semibold">
                <span className="label-text flex items-center gap-2">
                  <FaCheckCircle className="text-sm" />
                  Status
                </span>
              </label>
              <input
                type="text"
                value="pending"
                readOnly
                {...register("status")}
                className="input input-bordered bg-base-200"
              />
            </div> */}

            {/* Submit Button */}
            <div className="form-control md:col-span-2 mt-2">
              <button className="btn btn-primary w-full text-lg tracking-wide">
                Create Session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
