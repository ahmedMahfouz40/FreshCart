"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getLoggedUserCart } from "../_actions/cart.actions";
import { CartContextType, cartItemType } from "@/types/cartContext.type";
import { useSession } from "next-auth/react";

export const cartContext = createContext<CartContextType>(
  {} as CartContextType,
);

function CartContextProvider({ children }: { children: ReactNode }) {
  
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  const { status } = useSession();
  const [cartId, setCartId] = useState<string>('')
  const [numOfCartItems, setNumofCartItems] = useState<number>(0);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<cartItemType[]>();

  useEffect(() => {
    if (status === "loading") return;

    //  not logged in
    if (status === "unauthenticated") {
      setCartProducts([]);
      setNumofCartItems(0);
      setTotalCartPrice(0);
      setIsUserDataLoading(false);
      return;
    }

    //  logged in
    async function handleGetUserCart() {
      try {
        const userCart = await getLoggedUserCart();

        if (userCart.status === "success") {
          setNumofCartItems(userCart.numOfCartItems);
          setTotalCartPrice(userCart.data.totalCartPrice);
          setCartProducts(userCart.data.products);
          setCartId(userCart.cartId)
          
        } else {
          setCartProducts([]);
        }
      } catch (error) {
        console.log(error);
        setCartProducts([]);
      } finally {
        setIsUserDataLoading(false);
      }
    }

    handleGetUserCart();
  }, [status]);

  return (
    <cartContext.Provider
      value={{
        setNumofCartItems,
        numOfCartItems,
        setTotalCartPrice,
        totalCartPrice,
        setCartProducts,
        cartProducts,
        isUserDataLoading,
        setCartId,
        cartId
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartContextProvider;
