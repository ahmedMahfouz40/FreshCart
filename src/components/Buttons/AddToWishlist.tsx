"use client";
import { useAddToWishlist } from "@/hooks/useAddToWishlist";
import { FaCheck, FaHeart, FaRegHeart, FaSpinner } from "react-icons/fa6";

const AddToWishlist = ({ productId }: { productId: string }) => {
  const { handleAddToWishlist, isLoading, isSuccess, isInWishlist } =
    useAddToWishlist();

  return (
    <>
      <button
        onClick={() => handleAddToWishlist(productId)}
        className="cursor-pointer w-8 h-8 border rounded-full flex items-center justify-center shadow-md hover:text-error-500"
      >
        {isLoading == productId ? (
          <FaSpinner className="animate-spin" />
        ) : isInWishlist(productId) ? (
          <FaHeart className="text-red-500" />
        ) : isSuccess == productId ? (
          <FaCheck />
        ) : (
          <FaRegHeart />
        )}
      </button>
    </>
  );
};

export default AddToWishlist;
