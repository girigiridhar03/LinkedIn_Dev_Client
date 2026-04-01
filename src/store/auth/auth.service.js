import api from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authLogin = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);

export const authRegister = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", formData);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);

export const authLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/logout");
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Internal Server error",
      );
    }
  },
);
