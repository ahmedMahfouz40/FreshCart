"use client";
import { useAddToCart } from "@/app/_hooks/useAddToCart";
import { FaCheck, FaSpinner } from "react-icons/fa6";

const AddToCart = ({ productId }: { productId: string }) => {
  const { isLoading, isSuccess, handleAddToCart } = useAddToCart();

  return (
    <button
      onClick={() => handleAddToCart(productId)}
      disabled={isLoading === productId}
      className="w-10 h-10 bg-primary disabled:opacity-80 cursor-pointer rounded-full text-white flex items-center justify-center text-3xl transition-colors"
    >
      {isLoading ? (
        <FaSpinner className="animate-spin text-xl" />
      ) : isSuccess ? (
        <FaCheck className="text-xl" />
      ) : (
        "+"
      )}
    </button>
  );
};

export default AddToCart;
