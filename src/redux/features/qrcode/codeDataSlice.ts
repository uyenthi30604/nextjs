import { createSlice } from "@reduxjs/toolkit";

const initial = require("../../../app/(main)/qrcode/data.json");
export const qrcodeSlice = createSlice({
  name: "qrcode",
  initialState: {
    value: initial.data,
  },
  reducers: {
    addData: (state, action) => {
      state.value[0].value += action.payload.box;
      console.log("add action", action);
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addData } = qrcodeSlice.actions;
export default qrcodeSlice.reducer;
