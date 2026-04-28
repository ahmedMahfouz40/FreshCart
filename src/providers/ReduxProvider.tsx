"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store/reduxStore";
import { ReactNode } from "react";
import AppInitializer from "./AppInitializer";

const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AppInitializer />
      {children}
    </Provider>
  );
};

export default ReduxProvider;
