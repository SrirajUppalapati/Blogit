import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllBlogsAPI,
  getOneBlogAPI,
  getTrendingBlogsAPI,
} from "../../api/blogsAPI";

const initialState = {
  blogs: [],
  trendingBlogs: [],
  blog: [],
  trendingLoading: false,
  blogsLoading: false,
  oneBlogLoading: false,
  error: null,
  page: 1,
  filter: null,
};

export const getBlogs = createAsyncThunk("/home/allblogs", ({ page, filter }) =>
  getAllBlogsAPI({ page, filter })
);

export const getTrendingBlogs = createAsyncThunk(
  "/home/trendingblogs",
  getTrendingBlogsAPI
);

export const getOneBlog = createAsyncThunk(
  "/home/allblogs/oneblog",
  ({ blogId, mode }) => getOneBlogAPI({ blogId, mode })
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

    editBlog: (state, action) => {
      state.blog = action.payload;
    },
  },
  extraReducers: (builder) => {
    thunks.map((curr) =>
      builder
        .addCase(curr.pending, (state) => {
          if (curr === getBlogs) state.blogsLoading = true;

          if (curr === getTrendingBlogs) state.trendingLoading = true;

          if (curr === getOneBlog) state.oneBlogLoading = true;

          state.error = null;
        })
        .addCase(curr.rejected, (state, action) => {
          state.blogsLoading = false;
          state.trendingLoading = false;
          state.oneBlogLoading = false;
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
        state.blogsLoading = false;
        state.error = null;
      })
      .addCase(getTrendingBlogs.fulfilled, (state, action) => {
        state.trendingBlogs = action.payload;
        state.trendingLoading = false;
        state.error = null;
      })

      .addCase(getOneBlog.fulfilled, (state, action) => {
        state.blog = action.payload;
        state.oneBlogLoading = false;
        state.error = null;
      });
  },
});

export const { increasePage, changeFilter, editBlog } = homeSlice.actions;

export default homeSlice.reducer;
