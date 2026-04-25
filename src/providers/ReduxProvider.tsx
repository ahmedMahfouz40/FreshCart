"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store/reduxStore";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { fetchUserWishlist } from "@/redux/slices/wishlistSlice";
import { fetchUserAddress } from "@/redux/slices/addressSlice";
import { fetchUserCart } from "@/redux/slices/cartSlice";
import { useSession } from "next-auth/react";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AppInitializer />
      {children}
    </Provider>
  );
};

const AppInitializer = () => {
  const dispatch = useAppDispatch();
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;

    dispatch(fetchUserWishlist());
    dispatch(fetchUserAddress());
    dispatch(fetchUserCart());
  }, [dispatch, status]);

  return null;
};

export default ReduxProvider;
