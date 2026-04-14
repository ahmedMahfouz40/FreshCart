import React from "react";
import { FaSpinner } from "react-icons/fa6";

const PaymentLoading = () => {
  return (
    <div>
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center">
          <FaSpinner className="text-3xl text-primary-600 animate-spin" />
        </div>
        <p className="text-gray-600 mt-6 font-medium">Loading checkout...</p>
        <p className="text-gray-400 text-sm mt-1">Preparing your order</p>
      </div>
    </div>
  );
};

export default PaymentLoading;
