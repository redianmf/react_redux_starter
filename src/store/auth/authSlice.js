import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  userData: "",
  isLoading: false,
  isSessionExpired: false,
};

export const getLogin = createAsyncThunk(
  "auth/getLogin",
  async (name, thunkAPI) => {
    try {
      const response = await API.post("");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "authStore",
  initialState,
  reducers: {
    setSessionExpired: (state) => {
      state.isSessionExpired = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(getLogin.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setSessionExpired } = authSlice.actions;

export default authSlice.reducer;
