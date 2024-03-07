import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloginmodalopen: false,
  isSignupmodelopen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalopen: (state, action) => {
      state.isloginmodalopen = action.payload.isloginmodalopen;
      state.isSignupmodelopen = action.payload.isSignupmodelopen;
    },
    modalclose: (state) => {
      state.isloginmodalopen = false;
      state.isSignupmodelopen = false;
    },
  },
});

export const { modalopen, modalclose } = modalSlice.actions;
export default modalSlice.reducer;
