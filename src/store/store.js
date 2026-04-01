import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/auth.reducer";
import user from "./user/user.reducer";

const store = configureStore({
  reducer: {
    auth,
    user,
  },
});

export default store;
