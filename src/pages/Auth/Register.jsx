import React, { useContext, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaImage,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Lottie from "lottie-react";
import registerAnim from "../../assets/Animation/registration.json";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { AuthContext } from "../../main";
import { passwordValidator } from "../../utils/PasswordValidation";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { ErrorToast, SuccessToast } from "../../utils/ToastMaker";
import CollabEdNamePlate from "../../components/NamePlate/CollabEdNamePlate";
import useFetchApi from "../../Api/useFetchApi";
import { handleInsertDataRegister } from "../../utils/insertData";

const Register = () => {
  const { createUser, loginWithGoogle, mongoLoading, setMongoLoading } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { findTheUser, postTheUser } = useFetchApi();

  const imgbbApiKey = "68b7bc6153340102cff282ce4476f3fd"; // Replace with your real API key

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setUploading(true);
    fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setImageUrl(data.data.display_url);
        setUploading(false);
        SuccessToast("Image uploaded successfully!");
      })
      .catch((err) => {
        console.error(err);
        ErrorToast("Image upload failed!");
        setUploading(false);
      });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!imageUrl) {
      ErrorToast("Please wait for the image to upload!");
      return;
    }

    if (!passwordValidator(password, setErrorMassage)) return;

    createUser(email, password, name, imageUrl)
      .then((data) => {
        handleInsertDataRegister(
          data,
          findTheUser,
          postTheUser,
          mongoLoading,
          setMongoLoading
        );
        SuccessToast("Registration Successful");
        navigate("/");
      })
      .catch((error) => {
        ErrorToast(`Error Occurred: ${error.message}`);
      });
  };

  const handleRegisterWithGmail = () => {
    loginWithGoogle()
      .then((data) => {
        handleInsertDataRegister(
          data,
          findTheUser,
          postTheUser,
          mongoLoading,
          setMongoLoading
        );
        SuccessToast("Registration Successful");
      })
      .catch((error) => {
        ErrorToast(`Error Occurred: ${error.message}`);
      });
  };

  return (
    <section className="min-h-screen custom-gradient flex items-center justify-center px-4 py-10">
      <div className="bg-base-100 shadow rounded-2xl w-full lg:max-w-5xl mx-auto lg:flex justify-center items-center border border-primary shadow-primary ">
        {/* Lottie Animation */}
        <div className="w-full lg:w-2/5 h-[500px] flex justify-center items-center p-10">
          <Lottie animationData={registerAnim} loop={true} />
        </div>

        {/* Registration Form */}
        <div className="p-8 space-y-6 w-full lg:w-3/5">
          <h2 className="text-3xl lg:text-4xl font-extrabold flex items-center justify-center gap-2 text-neutral">
            Join <CollabEdNamePlate />
          </h2>
          <p className="text-center text-neutral text-lg my-2">
            Create an account to get started
          </p>

          <form className="space-y-4" onSubmit={handleRegister}>
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
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
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={0}
                role="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Password Error */}
            {errorMassage && (
              <div className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-lg shadow-sm text-sm">
                <span>{errorMassage}</span>
              </div>
            )}

            {/* Upload Profile Photo */}
            <div>
              <label className="block text-sm mb-2 text-gray-600">
                Upload Profile Photo
              </label>
              <div className="relative flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input file-input-bordered w-full"
                  required
                />
                {uploading && <span className="text-sm">Uploading...</span>}
              </div>

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="mt-2 h-20 rounded-md shadow"
                />
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full  buttonCss border-2 border-primary shadow-primary hover:shadow-sm transition-shadow duration-500 btn rounded-xl text-white text-lg p-2">

                {uploading ? "Please wait..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          {/* Google Sign-In */}
          <button
            onClick={handleRegisterWithGmail}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 bg-base-200/40 rounded-xl shadow-md hover:bg-base-100 transition duration-300 ease-in-out  font-medium border border-primary"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          {/* Footer */}
          <div className="text-center text-sm text-neutral">
            Already have an account?{" "}
            <a href="/login" className="text-secondary hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
