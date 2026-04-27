import Link from "next/link";
import React from "react";
import { FaArrowRight, FaBox } from "react-icons/fa6";

const CardEmpty = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="space-y-5 text-center  ">
        <div className="mx-auto bg-gray-100 text-gray-400 text-3xl w-32 h-32 flex items-center justify-center rounded-full">
          <FaBox />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your Card Is Empty
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>
        <Link
          className="inline-flex items-center gap-2 bg-linear-to-r from-primary-600 to-primary-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
          href="/"
        >
          Start Shopping
          <FaArrowRight className="text-sm" />
        </Link>
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
            href="/categories"
          >
            Electronics
          </Link>
          <Link
            className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
            href="/categories"
          >
            Fashion
          </Link>
          <Link
            className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
            href="/categories"
          >
            Home
          </Link>
          <Link
            className="px-4 py-2 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
            href="/categories"
          >
            Beauty
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CardEmpty;
