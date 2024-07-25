import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllBlogsAPI,
  getOneBlogAPI,
  getTrendingBlogsAPI,
} from "../../api/blogsAPI";

const initialState = {
  blogs: [],
  trendingBlogs: [],
  blog: {},
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

export const getOneBlog = createAsyncThunk(
  "/home/allblogs/oneblog",
  ({ blogId }) => getOneBlogAPI({ blogId })
);

const thunks = [getBlogs, getTrendingBlogs, getOneBlog];

const homeSlice = new createSlice({
  name: "home",
  initialState,
  reducers: {
    increasePage: (state) => {
      state.page += 1;
    },
    changeFilter: (state, action) => {
      state.blogs = [];
      state.filter = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    thunks.map((curr) =>
      builder
        .addCase(curr.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(curr.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error;
        })
    );

    builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.blogs = action.payload;
        } else {
          state.blogs = state.blogs.concat(action.payload);
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(getTrendingBlogs.fulfilled, (state, action) => {
        state.trendingBlogs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getOneBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { increasePage, changeFilter } = homeSlice.actions;

export default homeSlice.reducer;
