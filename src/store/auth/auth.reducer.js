import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authLogout, authRegister } from "./auth.service";

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
        state.loginError = null;
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
        state.registerError = null;
      })
      .addCase(authRegister.fulfilled, (state) => {
        state.authLoading = false;
      })
      .addCase(authRegister.rejected, (state, { payload }) => {
        state.authLoading = false;
        state.registerError = payload;
      })
      .addCase(authLogout.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.authLoading = false;
      })
      .addCase(authLogout.rejected, (state) => {
        state.authLoading = false;
      }),
});
export const { reset } = authReducer.actions;
export default authReducer.reducer;
