import { useState } from "react";
import { getUserWishlist } from "../_actions/wishlist.actions";
import { productType } from "@/types/product.type";

export function useGetWishlist() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<productType[] | null>(null);
  async function handleGetWishlist() {
    setIsLoading(true);
    try {
      const res = await getUserWishlist();
      if (res.status === "success") {
        setData(res.data);
        return true;
      }
      return false;
    } catch (error) {
      console.log("error during getting  wishlist", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  
}
