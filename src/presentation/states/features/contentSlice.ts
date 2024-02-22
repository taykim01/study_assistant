import { createSlice } from "@reduxjs/toolkit";

export const emptyInquiry = {
  value: "",
};

const initialState = emptyInquiry;

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    applycontent: (state, action) => {
      state.value = action.payload;
    },
    resetcontent: () => initialState,
  },
});

export const { applycontent, resetcontent } = contentSlice.actions;
export default contentSlice.reducer;
