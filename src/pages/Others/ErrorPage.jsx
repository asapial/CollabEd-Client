import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-200 flex flex-col items-center justify-center px-6 text-center">
      {/* Illustration */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="404 Collaboration"
        className="w-40 h-40 mb-6 animate-bounce"
      />

      {/* 404 Title */}
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
        404 - Page Not Found!
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-700 mb-8">
        Oops! The page you’re trying to access doesn’t exist. <br />
        Maybe it’s still under collaboration 📝
      </p>

      {/* Back to Dashboard Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md"
      >
        <FaArrowLeft />
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
