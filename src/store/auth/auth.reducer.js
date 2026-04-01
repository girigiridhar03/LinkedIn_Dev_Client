import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authLoading: false,
  error: null,
};

const authReducer = createSlice({
  name: "auth/reducer",
  initialState,
  reducers: {},
});

export default authReducer.reducer;
