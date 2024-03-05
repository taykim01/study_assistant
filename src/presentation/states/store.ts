import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./features/contentSlice";
import responsiveReducer from "./features/responsiveSlice";
import loadingReducer from "./features/loadingSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    responsive: responsiveReducer,
    loading: loadingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppStore = ReturnType<typeof configureStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
