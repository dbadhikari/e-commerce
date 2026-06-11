import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BACKEND_API = import.meta.env.VITE_BACKEND_API;
// 🔥 AUTO LOGIN (fetch user by id)
export const loadUserFromStorage = createAsyncThunk(
  "user/loadUserFromStorage",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        return rejectWithValue("No auth data");
      }

      const res = await axios.get(
        `${BACKEND_API}/UserRoute/${userId}`
      );

      return {
        user: res.data.user,
        token,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error loading user");
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.user._id); // ✅ IMPORTANT
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromStorage.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserFromStorage.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loadUserFromStorage.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;