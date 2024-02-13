import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  location: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
    },
    location: (state, action) => {
      state.location = action.payload.location;
    },
  },
});

export const { login, logout, location } = authSlice.actions;

export default authSlice.reducer;
