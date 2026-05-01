"use client";

import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { fetchUserWishlist } from "@/redux/slices/wishlistSlice";
import { fetchUserAddress } from "@/redux/slices/addressSlice";
import { fetchUserCart } from "@/redux/slices/cartSlice";
import { useSession } from "next-auth/react";

const AppInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) return;

    Promise.all([
      dispatch(fetchUserWishlist()),
      dispatch(fetchUserCart()),
      dispatch(fetchUserAddress()),
    ]);
  }, [dispatch, session]);

  return <>{children}</>;
};

export default AppInitializer;
