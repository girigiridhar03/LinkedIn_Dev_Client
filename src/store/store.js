import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/auth.reducer";

const store = configureStore({
  reducer: {
    auth,
  },
});

export default store