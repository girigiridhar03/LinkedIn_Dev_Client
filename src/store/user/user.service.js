import api from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserMeDetails = createAsyncThunk(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/me");
      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);
