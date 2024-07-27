import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfileAPI } from "../../api/userAPI";

const initialState = {
  userProfile: {},
  loading: false,
  error: null,
};

export const getUserProfile = createAsyncThunk(
  "/user/profile",
  ({ username }) => getUserProfileAPI({ username })
);

const dashSlice = createSlice({
  name: "dash",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.userProfile = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userProfile = initialState.profile;
      });
  },
});

// export const {} = dashSlice.actions;

export default dashSlice.reducer;
