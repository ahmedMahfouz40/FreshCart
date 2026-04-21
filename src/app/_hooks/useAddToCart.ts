import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addProductToCart } from "../_actions/cart.actions";
import { fetchUserCart } from "../_redux/slices/cartSlice";
import { useAppDispatch } from "./reduxHooks";
export function useAddToCart() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState<string | null>(null);

  async function handleAddToCart(productId: string) {
    setIsLoading(productId);
    try {
      const res = await addProductToCart(productId);

      if (res.status === "success") {
        toast.success(res.message, {
          position: "top-center",
          richColors: true,
        });
        dispatch(fetchUserCart());
        setIsSuccess(productId);
        setTimeout(() => {
          setIsSuccess(null);
        }, 2500);

        return true;
      }

      if (res.statusMsg === "fail") {
        toast.error(res.message, {
          position: "top-center",
          richColors: true,
        });
        router.push("/login");
      }

      return false;
    } catch (error) {
      console.log("error from add to cart", error);
      return false;
    } finally {
      setIsLoading(null);
    }
  }

  return {
    handleAddToCart,
    isLoading,
    isSuccess,
  };
}
