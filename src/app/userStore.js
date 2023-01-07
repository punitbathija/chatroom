import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

export const userStore = configureStore({
  reducer: {
    user: userReducer,
  },
});
