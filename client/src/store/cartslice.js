import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartcount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartcount = action.payload;
    },
    pluscart: (state) => {
      state.cartcount += 1;
    },
    minuscart: (state) => {
      state.cartcount = state.cartcount > 0 ? state.cartcount - 1 : 0;
    },
  },
});

export const { pluscart, minuscart, setCartCount } = cartSlice.actions;
export default cartSlice.reducer;
