import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/Auth";
import cartReducer from "./Slices/Cart";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});
