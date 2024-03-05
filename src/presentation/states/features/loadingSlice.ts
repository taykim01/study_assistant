import { createSlice } from "@reduxjs/toolkit";

export const loadingObjects = {
  loading: false,
};

const initialState = loadingObjects;

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    changeLoadingStatus: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { changeLoadingStatus } = loadingSlice.actions;
export default loadingSlice.reducer;
