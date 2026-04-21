import { useState } from "react";
import { toast } from "sonner";
import {
  addToWishlist,
} from "../_actions/wishlist.actions";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  fetchUserWishlist,
} from "../_redux/slices/wishlistSlice";
import { useDeleteFromWishlist } from "./useDeleteFromWishlist";

export function useAddToWishlist() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<string | null>(null);

  const { handleDeleteFromWishlist } = useDeleteFromWishlist();
  
  const { wishlistIds } = useAppSelector((state) => state.wishlistReducer);
  const isInWishlist = (productId: string) => wishlistIds?.includes(productId);

  async function handleAddToWishlist(productId: string) {
    setIsLoading(productId);
    try {
      if (wishlistIds?.includes(productId)) {
        await handleDeleteFromWishlist(productId);
        return;
      }

      const res = await addToWishlist(productId);

      if (res.status === "success") {
        toast.success(res.message, {
          position: "top-center",
          richColors: true,
        });
        dispatch(fetchUserWishlist());
        setIsSuccess(productId);
        setTimeout(() => {
          setIsSuccess(null);
        }, 2500);

        return true;
      } else if (res.statusMsg === "fail") {
        toast.error(res.message, {
          position: "top-center",
          richColors: true,
        });
      }
      return false;
    } catch (error) {
      console.log("error during addition to wishlist", error);
      return false;
    } finally {
      setIsLoading(null);
    }
  }

  return {
    handleAddToWishlist,
    isInWishlist,
    isLoading,
    isSuccess,
  };
}
