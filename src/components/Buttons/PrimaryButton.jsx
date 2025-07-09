import React from "react";

const PrimaryButton = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-6 py-2 rounded-2xl font-semibold shadow-md transition-all duration-300 ease-in-out
        bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400
        hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500
        text-white dark:text-white
        dark:from-indigo-600 dark:via-purple-600 dark:to-pink-600
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
