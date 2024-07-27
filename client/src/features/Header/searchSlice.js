import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getSearchTag,
  getSearchTitle,
  getSearchUser,
} from "../../api/searchAPI";

const initialState = {
  tagsResult: [],
  postsResult: [],
  usersResult: [],
  loading: false,
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

const searchSlice = new createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    thunks.map((curr) =>
      builder
        .addCase(curr.pending, (state, action) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(curr.fulfilled, (state, action) => {
          state.loading = false;
          state.searchResult = action.payload;
        })
        .addCase(curr.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
    );
  },
});

export default searchSlice.reducer;
