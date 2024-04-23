import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  user: null,
  userID: null,
  location: null,
  city: null,
  bussinessac: null,
  isverified: null,
  userimg: null,
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
      state.bussinessac = action.payload.bussinessac;
      // state.userimg = action.payload.userimg;
      state.isverified = action.payload.isverified;
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.user = null;
      state.userID = null;
      state.bussinessac = null;
      state.isverified = null;
      state.userimg = null;
    },
    UserImage: (state, action) => {
      state.userimg = action.payload.userimg;
    },
    location: (state, action) => {
      state.location = action.payload.location;
    },
    cities: (state, action) => {
      state.city = action.payload.city;
    },
  },
});

export const { login, logout, location, UserImage, cities } = authSlice.actions;

export default authSlice.reducer;
