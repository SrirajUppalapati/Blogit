import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signInAPI,
  signInWithGoogleAPI,
  signOutAPI,
  signUpAPI,
} from "../../api/authAPI";

export const signInUser = createAsyncThunk("/user/signin", (data) =>
  signInAPI(data)
);

export const signUpUser = createAsyncThunk("/user/signup", (data) =>
  signUpAPI(data)
);

export const signInWithGoogle = createAsyncThunk(
  "/user/signinWithGoogle",
  signInWithGoogleAPI
);

export const signOutUser = createAsyncThunk("/user/signout", signOutAPI);

const thunks = [signInUser, signUpUser, signInWithGoogle, signOutUser];

const initialState = {
  currentUser: null,
  token: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    editCurrentUser: (state, action) => {
      state.currentUser = { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    thunks.forEach((thunk) =>
      builder
        .addCase(thunk.pending, (state, action) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          if (thunk !== signOutUser) {
            state.currentUser = action.payload.data;
            state.token = action.payload.token;
          } else {
            state.currentUser = initialState.currentUser;
            state.token = initialState.token;
          }
          state.loading = false;
          state.error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    );
  },
});
export const { editCurrentUser } = authSlice.actions;
export default authSlice.reducer;
