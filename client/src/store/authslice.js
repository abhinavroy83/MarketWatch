import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  user: null,
  userID: null,
  location: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.userID = action.payload.userID;
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.user = null;
      state.userID = null;
    },
    location: (state, action) => {
      state.location = action.payload.location;
    },
  },
});

export const { login, logout, location } = authSlice.actions;

export default authSlice.reducer;
