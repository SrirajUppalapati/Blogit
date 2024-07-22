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
    signinStart: (state) => {
      state.loading = false;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;
        state.token = action.payload.access_token;
        state.loading = false;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;
        state.token = action.payload.access_token;
        state.loading = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signInWithGoogle.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.currentUser = action.payload.data;
        state.token = action.payload.access_token;
        state.loading = false;
        state.error = null;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signOutUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.currentUser = null;
        state.token = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { signinStart, signinSuccess, signinFailure, signoutSuccess } =
  authSlice.actions;

export default authSlice.reducer;
