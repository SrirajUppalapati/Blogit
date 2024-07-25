import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBlogsAPI, getTrendingBlogsAPI } from "../../api/blogsAPI";

const initialState = {
  blogs: [],
  trendingBlogs: [],
  loading: false,
  error: null,
  page: 1,
  filter: null,
};

export const getBlogs = createAsyncThunk(
  "/home/allblogs",
  ({ page, filter }) => {
    return getAllBlogsAPI({ page, filter });
  }
);

export const getTrendingBlogs = createAsyncThunk(
  "/home/trendingblogs",
  getTrendingBlogsAPI
);

const homeSlice = new createSlice({
  name: "home",
  initialState,
  reducers: {
    increasePage: (state, action) => {
      state.page += 1;
    },
    changeFilter: (state, action) => {
      state.blogs = [];
      state.filter = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.blogs = state.blogs.concat(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(getBlogs.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTrendingBlogs.fulfilled, (state, action) => {
        state.trendingBlogs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getTrendingBlogs.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrendingBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { increasePage, changeFilter } = homeSlice.actions;

export default homeSlice.reducer;
