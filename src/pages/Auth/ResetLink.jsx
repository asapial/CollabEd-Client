import { useNavigate } from "react-router";
import { useContext } from "react";
import { FiMail } from "react-icons/fi";
import { ErrorToast, SuccessToast } from "../../Utilities/ToastMaker";
import { AuthContext } from "../../main";

const ResetLink = () => {
  const navigate = useNavigate();
  const { resetEmail } = useContext(AuthContext);

const handleReset = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  try {
    await resetEmail(email);
    SuccessToast("📬 Password reset link sent. Check your email!");
    window.open("https://mail.google.com", "_blank");
    navigate("/login");
  } catch (error) {
    ErrorToast(`Error Occurred: ${error.message || error}`);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center px-4 custom-gradient bg-gradient-to-br from-base-100 to-base-300">
      <title>Reset | PlayPulse</title>
      <div className="bg-base-100 rounded-2xl w-full max-w-lg mx-auto flex flex-col justify-center items-center border border-primary shadow-primary shadow p-8">
        <h2 className="text-3xl font-bold text-center text-accent-800 mb-6">
          Forgot Password
        </h2>
        <form className="space-y-4 w-full" onSubmit={handleReset}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <FiMail className="text-lg" />
            Reset Password
          </button>
        </form>
        <p className="text-sm text-center text-accent-600 mt-4">
          You'll be redirected to Gmail after clicking reset.
        </p>
      </div>
    </div>
  );
};

export default ResetLink;