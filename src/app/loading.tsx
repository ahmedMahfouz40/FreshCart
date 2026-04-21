import React from "react";
import { FaSpinner } from "react-icons/fa6";

const loading = () => {
  return (
    <div className="bg-gray-100 absolute inset-0 h-screen flex items-center justify-center">
      <FaSpinner className="animate-spin text-5xl text-primary" />
    </div>
  );
};

export default loading;
