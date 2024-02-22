import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./features/contentSlice";
import responsiveReducer from "./features/responsiveSlice";

export default configureStore({
  reducer: {
    content: contentReducer,
    responsive: responsiveReducer,
  },
});
