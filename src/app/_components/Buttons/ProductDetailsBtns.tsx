"use client";
import { useAppSelector } from "@/app/_hooks/reduxHooks";
import { useAddToCart } from "@/app/_hooks/useAddToCart";
import { useAddToWishlist } from "@/app/_hooks/useAddToWishlist";
import { useDeleteFromWishlist } from "@/app/_hooks/useDeleteFromWishlist";
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

  const {
    handleAddToWishlist,
    isLoading: isAddingToWishlist,
    isSuccess: isAddedToWishlist,
  } = useAddToWishlist();

  const { handleDeleteFromWishlist, isLoading: isDeletingFromWishlist } =
    useDeleteFromWishlist();

  const { cartProducts } = useAppSelector((state) => state.cartReducer);
  const { wishlistIds } = useAppSelector((state) => state.wishlistReducer);

  const isInWishlist = wishlistIds?.includes(productId);
  const isInCart = cartProducts.some((prod) => prod.product._id === productId);

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      handleDeleteFromWishlist(productId);
    } else {
      handleAddToWishlist(productId);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleAddToCart(productId)}
            className={`${
              isLoading || isSuccess
                ? "opacity-90 bg-primary-600 text-white"
                : isInCart
                  ? "bg-primary-100 text-primary hover:bg-primary-200"
                  : "bg-primary-600 text-white"
            } transition-colors flex items-center justify-center w-1/2 text-sm cursor-pointer rounded-xl py-4 gap-2`}
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : isSuccess ? (
              <>
                <FaCheck /> Added To Cart
              </>
            ) : isInCart ? (
              <>
                <FaCartShopping /> In Cart
              </>
            ) : (
              <>
                <FaCartShopping /> Add To Cart
              </>
            )}
          </button>

          <button className="bg-black text-white transition-colors w-1/2 flex items-center justify-center text-sm cursor-pointer rounded-xl py-4 gap-2">
            <MdElectricBolt /> Buy Now
          </button>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={handleWishlistToggle}
            disabled={!!isAddingToWishlist || !!isDeletingFromWishlist} // ← convert to boolean
            className={`${
              isInWishlist
                ? "text-red-400 bg-red-50 border-red-200 hover:text-red-500 hover:border-red-500"
                : "text-[#364153] hover:text-primary hover:border-primary bg-transparent"
            } w-full border-2 transition-colors flex items-center justify-center text-sm cursor-pointer rounded-xl py-4 gap-2`}
          >
            {isAddingToWishlist ? (
              <>
                <FaSpinner className="animate-spin" /> Adding To Wishlist....
              </>
            ) : isDeletingFromWishlist ? (
              <>
                <FaSpinner className="animate-spin" /> Deleting From
                Wishlist....
              </>
            ) : isAddedToWishlist ? (
              <>
                <FaCheck /> Added!
              </>
            ) : isInWishlist ? (
              <>
                <FaHeart /> In Wishlist
              </>
            ) : (
              <>
                <FaHeart /> Add To Wishlist
              </>
            )}
          </button>

          <button className="p-4 w-14 h-14 border-2 rounded-xl hover:text-primary hover:border-primary transition-colors cursor-pointer">
            <FaShareNodes />
          </button>
        </div>
      </div>
    </>
  );
};

export default Btns;
