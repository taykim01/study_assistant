// store/index.ts
import { Store } from "redux";
import contentReducer from "@/presentation/states/features/contentSlice";
import responsiveReducer from "@/presentation/states/features/responsiveSlice";
import loadingReducer from "@/presentation/states/features/loadingSlice";
import { configureStore } from "@reduxjs/toolkit";

let store: Store | undefined;

export const initializeStore = (initialState = {}) => {
  let _store =
    store ??
    configureStore({
      reducer: {
        content: contentReducer,
        responsive: responsiveReducer,
        loading: loadingReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    });

  if (typeof window === "undefined") return _store;

  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState: any) => {
  const store = initializeStore(initialState);

  return store;
};
