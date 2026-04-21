"use client";

import { Provider } from "react-redux";
import { store } from "../_redux/store/reduxStore";
import { ReactNode, useEffect } from "react";
import { fetchUserWishlist } from "../_redux/slices/wishlistSlice";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    store.dispatch(fetchUserWishlist());
  }, []);
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
};

export default ReduxProvider;
