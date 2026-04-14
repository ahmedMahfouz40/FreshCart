import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addProductToCart } from "../_actions/cart.actions";
import { cartContext } from "../_context/CartContextProvider";

export function useAddToCart() {
  const router = useRouter();

  const { setNumofCartItems, setCartProducts, setTotalCartPrice ,setCartId } =
    useContext(cartContext);

  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  async function handleAddToCart(productId: string) {
    setIsLoading(true);

    try {
      const res = await addProductToCart(productId);
      console.log(res, 'res from hook');
      
      if (res.status === "success") {
        toast.success(res.message, {
          position: "top-center",
          richColors: true,
        });

        setIsSuccess(true);

        setNumofCartItems(res.numOfCartItems);
        setTotalCartPrice(res.data.totalCartPrice);
        setCartProducts(res.data.products);
        setCartId(res.cartId)
        setTimeout(() => {
          setIsSuccess(false);
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
      setIsLoading(false);
    }
  }

  return {
    handleAddToCart,
    isLoading,
    isSuccess,
  };
}
