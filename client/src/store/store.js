import { configureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";
import modalslice from "./modalslice";
import adminauthslice from "./adminauthslice";
import cartslice from "./cartslice";

const store = configureStore({
  reducer: {
    auth: authslice,
    modal: modalslice,
    adminauth: adminauthslice,
    cart: cartslice,
  },
});

export default store;
