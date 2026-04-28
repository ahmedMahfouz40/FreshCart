"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { fetchUserWishlist } from "@/redux/slices/wishlistSlice";
import { fetchUserAddress } from "@/redux/slices/addressSlice";
import { fetchUserCart } from "@/redux/slices/cartSlice";
import { useSession } from "next-auth/react";

const AppInitializer = () => {
  const dispatch = useAppDispatch();
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading" || status === "unauthenticated") return;

    Promise.all([
      dispatch(fetchUserWishlist()),
      dispatch(fetchUserCart()),
      dispatch(fetchUserAddress()),
    ]);
  }, [dispatch, status]);

  return null;
};

export default AppInitializer;
