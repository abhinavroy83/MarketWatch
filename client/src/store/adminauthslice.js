import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  role: null,
};

const adminauthslice = createSlice({
  name: "adminauth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.role = null;
    },
  },
});

export const { login, logout } = adminauthslice.actions;

export default adminauthslice.reducer;
