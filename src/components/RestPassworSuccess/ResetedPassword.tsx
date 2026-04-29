import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa6";

const ResetedPassword = () => {
  return (
    <div>
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
        </div>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <FaCheck className="text-primary text-3xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Password Reset!
            </h2>
            <p className="text-gray-600">
              Your password has been successfully reset. You can now sign in
              with your new password.
            </p>
          </div>
          <Link
            href={"/login"}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetedPassword;
