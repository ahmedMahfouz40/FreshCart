"use client";
import { useAddToCart } from "@/app/_hooks/useAddToCart";
import {
  FaCartShopping,
  FaCheck,
  FaHeart,
  FaShareNodes,
  FaSpinner,
} from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";

const Btns = ({ productId }: { productId: string }) => {
  
  const { isLoading, isSuccess, handleAddToCart } = useAddToCart();

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleAddToCart(productId)}
            className={`${
              isLoading || isSuccess
                ? "opacity-90  bg-primary-600 text-white"
                : "bg-primary-600 text-white"
            }  transition-colors  flex items-center justify-center w-1/2 text-sm cursor-pointer rounded-xl   py-4 gap-2`}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : isSuccess ? (
              <>
                <FaCheck /> Added To Cart
              </>
            ) : (
              <>
                <FaCartShopping /> Add To Cart
              </>
            )}
          </button>

          <button
            className={`bg-black  text-white  transition-colors w-1/2 flex items-center justify-center  text-sm cursor-pointer rounded-xl   py-4 gap-2`}
          >
            <MdElectricBolt /> Buy Now
          </button>
        </div>

        <div className="flex gap-3 items-center">
          <button
            className={`bg-transparent w-full text-[#364153] hover:text-primary hover:border-primary border-2 transition-colors  flex items-center justify-center  text-sm cursor-pointer rounded-xl   py-4 gap-2`}
          >
            <FaHeart /> Add To Wishlist
          </button>

          <button className="p-4 w-14 h-14  border-2 rounded-xl hover:text-primary hover:border-primary transition-colors  cursor-pointer">
            <FaShareNodes />
          </button>
        </div>
      </div>
    </>
  );
};

export default Btns;
