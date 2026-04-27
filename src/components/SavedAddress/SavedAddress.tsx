import React from "react";
import { FaCity, FaLocationDot, FaPhone } from "react-icons/fa6";

const SavedAddress = () => {
  return (
    <>
      <input
        type="radio"
        name="paymentMethod"
        id="savedAddress"
        className="hidden "
      />
      <label
        htmlFor="savedAddress"
        className=" flex items-center gap-3 border-2 border-gray-200  p-4  rounded-2xl"
      >
        <span className="w-10 h-10 self-start bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center">
          <FaLocationDot />
        </span>
        <div>
          <h5 className="text-heading font-semibold">Sadat City</h5>
          <p className="text-sm text-gray-600">Sadat City</p>
          <div className="flex items-center gap-4 mt-1">
            <span className="flex items-center gap-2 text-xs text-gray-500">
              <FaPhone /> 01097514862
            </span>
            <span className="flex items-center gap-2 text-xs text-gray-500">
              <FaCity /> Sadat City
            </span>
          </div>
        </div>
      </label>

      <div className=" flex  items-center gap-3 border-2 cursor-pointer border-dashed border-primary-500 bg-primary-50 p-4  rounded-2xl">
        <span className="w-8 h-8 bg-primary text-white rounded-lg text-2xl flex items-center justify-center">
          +
        </span>
        <div>
          <h5 className="font-semibold text-primary-800">
            Use a different address
          </h5>
          <p className="text-xs text-gray-500">
            Enter a new shipping address manually
          </p>
        </div>
      </div>
    </>
  );
};

export default SavedAddress;
