import { createSlice } from "@reduxjs/toolkit";

export const responsiveSlice = createSlice({
  name: "responsive",
  initialState: {
    width: null,
    responsive: null,
  },
  reducers: {
    changeWidth: (state, action) => {
      state.width = action.payload.width;
      state.responsive = action.payload.responsive;
    },
  },
});

export const { changeWidth } = responsiveSlice.actions;
export default responsiveSlice.reducer;