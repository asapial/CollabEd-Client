import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-100 via-emerald-100 to-green-200 flex flex-col items-center justify-center px-6 text-center">
      {/* Food Illustration */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/3480/3480354.png"
        alt="404 Food"
        className="w-40 h-40 mb-6 animate-bounce"
      />

      {/* 404 Title */}
      <h1 className="text-5xl font-extrabold text-emerald-700 mb-4">
        404 - Recipe Not Found!
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-700 mb-8">
        Oops! We couldn’t find the recipe you were looking for. <br />
        Maybe it’s still cooking 🍳
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition shadow-md"
      >
        <FaArrowLeft />
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
