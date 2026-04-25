import { useState } from "react";
import { toast } from "sonner";
import { deleteProductFromCart } from "../actions/cart.actions";
import { useAppDispatch } from "./reduxHooks";
import { removeFromCart } from "../redux/slices/cartSlice";

export function useDeleteFromCart() {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);

  async function handleDeleteFromCart(productId: string) {
    setIsLoading(productId);
    try {
      const res = await deleteProductFromCart(productId);
      if (res.status == "success") {
        toast.success(res.message, {
          position: "top-center",
          richColors: true,
        });
        setIsSuccess(true);
        dispatch(removeFromCart(productId));
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
    handleDeleteFromCart,
    isLoading,
    isSuccess,
  };
}
