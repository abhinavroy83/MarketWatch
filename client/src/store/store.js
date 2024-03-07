import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import modalslice from "./modalslice";

const store = configureStore({
  reducer: {
    auth: authslice,
    modal: modalslice,
  },
});

export default store;
