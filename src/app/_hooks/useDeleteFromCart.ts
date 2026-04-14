import { useState, useContext } from "react";
import { toast } from "sonner";
import {
  deleteProductFromCart,
} from "../_actions/cart.actions";
import { cartContext } from "../_context/CartContextProvider";

export function useDeleteFromCart() {
  const { setNumofCartItems, setCartProducts, setTotalCartPrice, setCartId } =
    useContext(cartContext);

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
        setIsSuccess(true)
        setNumofCartItems(res.numOfCartItems);
        setTotalCartPrice(res.data.totalCartPrice);
        setCartProducts(res.data.products);
        setCartId(res.cartId);
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
