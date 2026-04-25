"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { clearCart, fetchUserCart } from "@/redux/slices/cartSlice";
import { useAppDispatch } from "@/hooks/reduxHooks";

export default function CartInitializer() {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(fetchUserCart());
    }

    if (status === "unauthenticated") {
      dispatch(clearCart());
    }
  }, [status, dispatch]);

  return null;
}
