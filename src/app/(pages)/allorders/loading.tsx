import React from "react";
import { FaSpinner } from "react-icons/fa6";

const loading = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
        <FaSpinner className="text-3xl text-primary-600 animate-spin" />
      </div>
      <p className="text-gray-900 font-medium">Loading your orders...</p>
      <p className="text-gray-500 text-sm mt-1">Please wait</p>
    </div>
  );
};

export default loading;
