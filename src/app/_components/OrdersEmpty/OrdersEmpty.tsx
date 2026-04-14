import Link from "next/link";
import React from "react";
import { FaBagShopping, FaBoxOpen } from "react-icons/fa6";

const OrdersEmpty = () => {
  return (
    <div>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
            <FaBoxOpen className="text-gray-400 text-4xl"/>
           
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            When you place orders, they&apos;ll appear here
            <br />
            so you can track them.
          </p>
          <Link
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3.5 px-8 rounded-xl font-semibold transition-all shadow-lg shadow-primary-600/20 w-full sm:w-auto"
            href="/"
          >
            <FaBagShopping/>
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersEmpty;
