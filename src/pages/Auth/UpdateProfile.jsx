import React, { useContext } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaImage,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AuthContext } from "../../main";
import Playpulsebutton from "../../Atoms/Playpulsebutton";
import { ErrorToast, SuccessToast } from "../../Utilities/ToastMaker";
import Playpulsenameplate from "../../Atoms/Playpulsenameplate";
import { motion } from "framer-motion";

const UpdateProfile = () => {
  const { updateUser, user } = useContext(AuthContext);

  const handleUpdateUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;

    updateUser(name, photoURL)
      .then(() => {
        SuccessToast("Profile Updated Successfully");
      })
      .catch((error) => {
        ErrorToast(`Error Occurred: ${error.message}`);
      });
  };

  return (
    <section className="min-h-screen custom-gradient flex items-center justify-center px-4 py-10">
      <title>PlayPulse | Update Profile</title>
      <div className="bg-base-100 shadow rounded-2xl w-full lg:max-w-5xl mx-auto lg:flex justify-center items-center border border-primary shadow-primary ">
        {/* Profile Image with Breathing Effect */}
        <div className="w-full lg:w-2/5 flex justify-center items-center p-10">
          <motion.img
            src={user?.photoURL}
            alt=""
            className="w-full"
            style={{ maxWidth: 220, borderRadius: "50%" }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Registration Form */}
        <div className="p-8 space-y-6 w-full lg:w-3/5">
          <h2 className="text-3xl font-extrabold text-center text-neutral flex justify-center items-center">
            Join <Playpulsenameplate></Playpulsenameplate>
          </h2>
          <p className="text-center text-neutral text-sm">
            Update your profile
          </p>

          <form className="space-y-4" onSubmit={handleUpdateUser}>
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
                defaultValue={user.displayName}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={user?.email}
                readOnly
              />
            </div>

            {/* Profile Photo Link */}
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                name="photoURL"
                placeholder="Profile Photo URL"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                defaultValue={user.photoURL}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full">
              <Playpulsebutton>Update Profile</Playpulsebutton>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;