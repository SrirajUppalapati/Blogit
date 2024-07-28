import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getSearchTag,
  getSearchTitle,
  getSearchUser,
} from "../../api/searchAPI";

const initialState = {
  tagsResult: {},
  postsResult: {},
  usersResult: {},
  tagsLoading: false,
  usersLoading: false,
  postsLoading: false,

  error: null,
};

export const searchTag = createAsyncThunk("/search/tag", ({ query }) =>
  getSearchTag({ query })
);

export const searchTitle = createAsyncThunk("/search/title", ({ query }) =>
  getSearchTitle({ query })
);

export const searchUser = createAsyncThunk("/search/user", ({ query }) =>
  getSearchUser({ query })
);

const thunks = [searchTag, searchTitle, searchUser];

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    thunks.map((curr) =>
      builder
        .addCase(curr.pending, (state) => {
          if (curr === searchTag) {
            state.tagsLoading = true;
          }
          if (curr === searchTitle) {
            state.postsLoading = true;
          }
          if (curr === searchUser) {
            state.usersLoading = true;
          }
          state.error = null;
        })
        .addCase(curr.fulfilled, (state, action) => {
          if (curr === searchTag) {
            state.tagsLoading = false;
            state.tagsResult = action.payload;
          }
          if (curr === searchTitle) {
            state.postsLoading = false;
            state.postsResult = action.payload;
          }
          if (curr === searchUser) {
            state.usersLoading = false;
            state.usersResult = action.payload;
          }
        })
        .addCase(curr.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    );
  },
});

export default searchSlice.reducer;
