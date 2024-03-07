import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import modalslice from "./modalslice";
import adminauthslice from "./adminauthslice";

const store = configureStore({
  reducer: {
    auth: authslice,
    modal: modalslice,
    adminauth: adminauthslice,
  },
});

export default store;
