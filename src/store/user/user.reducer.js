import { createSlice } from "@reduxjs/toolkit";
import { getUserMeDetails } from "./user.service";

const initialState = {
  userLoading: false,
  error: null,
  userMe: null,
  authChecked: false,
};

const userReducer = createSlice({
  name: "user/reducer",
  initialState,
  reducers: {
    logout: (state) => {
      state.userMe = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserMeDetails.pending, (state) => {
        state.userLoading = true;
        state.error = null;
      })
      .addCase(getUserMeDetails.fulfilled, (state, { payload }) => {
        state.userLoading = false;
        state.authChecked = true;
        state.userMe = payload ?? null;
      })
      .addCase(getUserMeDetails.rejected, (state, { payload }) => {
        state.userLoading = false;
        state.authChecked = true;
        state.userMe = null;
        state.error = payload;
      }),
});

export const { logout } = userReducer.actions;
export default userReducer.reducer;
