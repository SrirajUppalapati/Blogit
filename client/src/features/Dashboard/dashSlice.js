import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserBlogsAPI, getUserProfileAPI } from "../../api/userAPI";
import { deleteOneBlogAPI } from "../../api/blogsAPI";

const initialState = {
  userProfile: {},
  blogs: [],
  blogsLoading: false,
  userLoading: false,
  error: null,
};

export const getUserProfile = createAsyncThunk(
  "/user/profile",
  ({ username }) => getUserProfileAPI({ username })
);

export const getUserBlogs = createAsyncThunk("/user/blogs", ({ token }) =>
  getUserBlogsAPI({ token })
);

export const deleteBlog = createAsyncThunk(
  "/blogs/delete",
  ({ token, blogId }) => {
    deleteOneBlogAPI({ token, blogId });
  }
);
const dashSlice = createSlice({
  name: "dash",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state, action) => {
        state.userLoading = true;
        state.error = null;
        state.userProfile = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userLoading = false;
        state.error = null;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.userLoading = false;
        state.error = action.payload;
        state.userProfile = initialState.profile;
      })
      .addCase(getUserBlogs.pending, (state, action) => {
        state.blogsLoading = true;
        state.error = null;
        state.blogsData = null;
      })
      .addCase(getUserBlogs.fulfilled, (state, action) => {
        state.blogsLoading = false;
        state.error = null;
        state.blogsData = action.payload;
      })
      .addCase(getUserBlogs.rejected, (state, action) => {
        state.blogsLoading = false;
        state.error = action.payload;
        state.blogsData = initialState.blogs;
      });
  },
});

// export const {} = dashSlice.actions;

export default dashSlice.reducer;
