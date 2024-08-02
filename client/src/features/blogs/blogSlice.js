import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import toast from "react-hot-toast";
import { createBlogAPI, updateOneBlogAPI } from "../../api/blogsAPI";

const initialState = {
  blog: {
    title: "",
    banner: "",
    description: "",
    content: [],
    tags: [],
  },
  editor: { isReady: false },
  error: null,
  bannerLoading: false,
  blogLoading: false,
};

export const uploadBanner = createAsyncThunk(
  "blog/uploadBanner",
  async (file) => {
    try {
      const fileName = Date.now() + "-" + file.name;
      const imageRef = ref(storage, `Banner/${fileName}`);
      const img = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(img.ref);
      return url;
    } catch (err) {
      toast.error("Please upload image files.");
      console.error(err);
    }
  }
);

export const uploadBlog = createAsyncThunk("blog/upload", ({ blog, token }) =>
  createBlogAPI({ blog, token })
);

export const updateBlog = createAsyncThunk(
  "blog/update",
  ({ blog, token, blogId }) => updateOneBlogAPI({ blog, token, blogId })
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    writeBlog: (state, action) => {
      state.blog = { ...state.blog, ...action.payload };
      state.error = null;
    },
    clearBlog: (state, action) => {
      state.blog = initialState.blog;
    },
    setEditor: (state, action) => {
      state.editor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadBanner.pending, (state) => {
        state.bannerLoading = true;
        state.error = null;
      })
      .addCase(uploadBanner.fulfilled, (state, action) => {
        state.blog.banner = action.payload;
        state.bannerLoading = false;
      })
      .addCase(uploadBanner.rejected, (state, action) => {
        state.bannerLoading = false;
        state.error = action.payload;
      })
      .addCase(uploadBlog.pending, (state) => {
        state.blogLoading = true;
        state.error = null;
      })
      .addCase(uploadBlog.fulfilled, (state, action) => {
        state.blogLoading = false;
        state.blog = initialState.blog;
        state.error = null;
      })
      .addCase(uploadBlog.rejected, (state, action) => {
        state.blogLoading = false;
        state.error = action.payload || "Something went wrong!";
      })
      .addCase(updateBlog.pending, (state) => {
        state.blogLoading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.blogLoading = false;
        state.blog = initialState.blog;
        state.error = null;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.blogLoading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export const { writeBlog, clearBlog, setEditor } = blogSlice.actions;

export default blogSlice.reducer;
