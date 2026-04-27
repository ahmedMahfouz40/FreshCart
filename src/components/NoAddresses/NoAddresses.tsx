import AddAddressModal from "@/components/AddAddressModal/AddAddressModal";
import React from "react";
import { FaLocationDot, FaPlus } from "react-icons/fa6";

const NoAddresses = () => {
  return (
    <div>
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
          <FaLocationDot className="text-3xl text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          No Addresses Yet
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Add your first delivery address to make checkout faster and easier.
        </p>
        <AddAddressModal buttonTitle=" Add Your First Address" />
      </div>
    </div>
  );
};

export default NoAddresses;
