"use client";
import { useAddToWishlist } from "@/app/_hooks/useAddToWishlist";
import { FaCheck, FaRegHeart, FaSpinner } from "react-icons/fa6";

const AddToWishlist = ({ productId }: { productId: string }) => {
  
  const { handleAddToWishlist, isLoading, isSuccess } = useAddToWishlist();
  return (
    <>
      <button
        onClick={() => handleAddToWishlist(productId)}
        className="cursor-pointer w-8 h-8 border rounded-full flex items-center justify-center shadow-md hover:text-error-500"
      >
        {isLoading ? (
          <FaSpinner className="animate-spin" />
        ) : isSuccess ? (
          <FaCheck />
        ) : (
          <FaRegHeart />
        )}
      </button>
    </>
  );
};

export default AddToWishlist;
