import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addProductToCart } from "../_actions/cart.actions";
import { cartContext } from "../_context/CartContextProvider";

export function useAddToCart() {
  const router = useRouter();

  const { setNumofCartItems, setCartProducts, setTotalCartPrice ,setCartId } =
    useContext(cartContext);

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

        setIsSuccess(productId);

        setNumofCartItems(res.numOfCartItems);
        setTotalCartPrice(res.data.totalCartPrice);
        setCartProducts(res.data.products);
        setCartId(res.cartId)
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
