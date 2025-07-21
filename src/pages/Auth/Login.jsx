import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Add these imports
import login from "../../assets/Animation/login.json";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import { ErrorToast, SuccessToast } from "../../utils/ToastMaker";
import { AuthContext } from "../../main";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import CollabEdNamePlate from "../../components/NamePlate/CollabEdNamePlate";
import useFetchApi from "../../Api/useFetchApi";
import {  handleInsertDataLogin } from "../../utils/insertData";

const Login = () => {
  const { loginUser, loginWithGoogle,     mongoLoading, setMongoLoading } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  // const [previousUser, setPreviousUser] = useState(false);
  const navigate = useNavigate();
  const location=useLocation();
  const { findTheUser, postTheUser } = useFetchApi();
  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((data) => {
        console.log(data);
        handleInsertDataLogin(data, findTheUser, postTheUser,mongoLoading, setMongoLoading);
        SuccessToast("Login Successful — Great to see you again!");

            navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        ErrorToast(`Error Occurred: ${error.message}`);
      });
  };

  const handleLoginWithGmail = () => {
    loginWithGoogle()
      .then((data) => {
        handleInsertDataLogin(data, findTheUser, postTheUser,mongoLoading, setMongoLoading);
        SuccessToast("Login Successful — Great to see you again!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        ErrorToast(`Error Occurred: ${error.message}`);
      });
  };

  return (
    <section className="min-h-screen custom-gradient flex items-center justify-center px-4 py-10">
      <div className="bg-base-100  rounded-2xl w-full lg:max-w-5xl mx-auto lg:flex justify-center items-center border border-primary shadow-primary shadow ">
        <div className="w-full lg:w-2/5 h-[500px] flex justify-center items-center p-10">
          <Lottie animationData={login} loop={true} />
        </div>
        <div className="w-full lg:w-3/5 p-10">
          {/* Logo / Title */}
          <h2 className="text-3xl lg:text-4xl font-extrabold flex items-center gap-2 justify-center text-neutral">
            Welcome to <CollabEdNamePlate></CollabEdNamePlate>
          </h2>
          <p className="text-center text-neutral text-lg my-2">
            Please sign in to continue
          </p>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
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

            {/* Forgot Password Link */}
            <div className="text-right mt-1">
              <a
                href="/forgetPassword"
                className="text-secondary text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full">
              <PrimaryButton>Sign In</PrimaryButton>
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
            onClick={handleLoginWithGmail}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3  bg-base-300 rounded-xl shadow-sm 
             hover:border-primary transition duration-300 ease-in-out text-neutral font-medium"
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </button>

          {/* Footer */}
          <div className="text-center text-sm text-neutral">
            Don’t have an account?{" "}
            <a href="/register" className="text-secondary hover:underline">
              Register
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
