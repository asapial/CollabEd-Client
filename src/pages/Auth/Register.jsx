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

const Register = () => {
  const { createUser, loginWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [errorMassage, setErrorMassage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    console.log(email, password, name, photoURL);

    // password validation

    console.log(errorMassage);
    if (!passwordValidator(password, setErrorMassage)) return;

    createUser(email, password, name, photoURL)
      .then(() => {
        // Registration successful, show success message or redirect
        SuccessToast("Registration Successful");
        navigate("/");

      })
      .catch((error) => {
        ErrorToast(`Error Occurred: ${error.message}`);
      });
  };

  const handleRegisterWithGmail = () => {
    loginWithGoogle()
      .then(() => {
        // Registration successful, show success message or redirect
        SuccessToast("Registration Successful");
      })
      .catch((error) => {
        ErrorToast(`Error Occurred: ${error.message}`);
      });
  };

  return (
    <section className="min-h-screen custom-gradient flex items-center justify-center px-4 py-10">
      <title>PlayPulse | Register</title>
      <div className="bg-base-100 shadow rounded-2xl w-full lg:max-w-5xl mx-auto lg:flex justify-center items-center border border-primary shadow-primary ">
        {/* Lottie Animation */}
        <div className="w-full lg:w-2/5 h-[500px] flex justify-center items-center p-10">
          <Lottie animationData={registerAnim} loop={true} />
        </div>

        {/* Registration Form */}
        <div className="p-8 space-y-6 w-full lg:w-3/5">
          <h2 className="text-3xl lg:text-5xl font-extrabold flex items-center justify-center gap-2 text-neutral">
            Join <CollabEdNamePlate></CollabEdNamePlate>
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

            {/* password error  */}

            {errorMassage && (
              <div className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded-lg shadow-sm text-sm">
                <span>{errorMassage}</span>
              </div>
            )}

            {/* Profile Photo Link */}
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                name="photoURL"
                placeholder="Profile Photo URL"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full">
              <PrimaryButton>Register</PrimaryButton>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>

          {/* Google Sign-In Button */}
          <button
            onClick={handleRegisterWithGmail}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3  bg-base-200 rounded-xl shadow-sm 
                         hover:bg-base-100 transition duration-300 ease-in-out text-neutral font-medium"
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
