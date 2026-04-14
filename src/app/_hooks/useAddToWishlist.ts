import { useState } from "react";
import { toast } from "sonner";
import { addToWishlist } from "../_actions/wishlist.actions";
import { useQueryClient } from "@tanstack/react-query";

export function useAddToWishlist() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  async function handleAddToWishlist(productId: string) {
    setIsLoading(true);

    try {
      const res = await addToWishlist(productId);

      if (res.status === "success") {
        toast.success(res.message, {
          position: "top-center",
          richColors: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["wishlist"],
        });
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
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
      setIsLoading(false);
    }
  }

  return {
    handleAddToWishlist,
    isLoading,
    isSuccess,
  };
}
