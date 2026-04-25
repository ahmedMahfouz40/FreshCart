import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "./reduxHooks";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { DeleteFromWishlist } from "../actions/wishlist.actions";

export function useDeleteFromWishlist() {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);

  async function handleDeleteFromWishlist(productId: string) {
    setIsLoading(productId);
    try {
      const res = await DeleteFromWishlist(productId);

      if (res.status == "success") {
        toast.success(res.message, {
          position: "top-center",
          richColors: true,
        });
        setIsSuccess(true);
        dispatch(removeFromWishlist(productId));
      }

      if (res.statusMsg == "fail") {
        toast.error(res.message, { position: "top-center", richColors: true });
      }
    } catch (error) {
      console.log("error from add to cart", error);
    } finally {
      setIsLoading(null);
    }
  }

  return {
    handleDeleteFromWishlist,
    isLoading,
    isSuccess,
  };
}
