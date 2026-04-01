import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authRegister } from "./auth.service";

const initialState = {
  authLoading: false,
  loginError: null,
  registerError: null,
};

const authReducer = createSlice({
  name: "auth/reducer",
  initialState,
  reducers: {
    reset: (state) => {
      state.loginError = null;
      state.registerError = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(authLogin.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(authLogin.fulfilled, (state) => {
        state.authLoading = false;
      })
      .addCase(authLogin.rejected, (state, { payload }) => {
        state.authLoading = false;
        state.loginError = payload;
      })
      .addCase(authRegister.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(authRegister.fulfilled, (state) => {
        state.authLoading = false;
      })
      .addCase(authRegister.rejected, (state, { payload }) => {
        state.authLoading = false;
        state.registerError = payload;
      }),
});
export const { reset } = authReducer.actions;
export default authReducer.reducer;
