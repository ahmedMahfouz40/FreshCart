import React from "react";
import { FaSpinner } from "react-icons/fa6";

const Loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center py-32">
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-primary mb-4 text-3xl" />
          <p className="text-gray-500">Loading wishlist...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
