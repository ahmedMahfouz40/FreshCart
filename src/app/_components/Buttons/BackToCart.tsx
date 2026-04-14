"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

const BackToCart = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.back()}
        className="flex items-center text-primary gap-2 cursor-pointer"
      >
        <span>
          <FaArrowLeft />
        </span>
        <span>Back to Cart</span>
      </button>
    </div>
  );
};

export default BackToCart;
