import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import toast from "react-hot-toast";
import { createBlogAPI } from "../../api/blogsAPI";

const initialState = {
  blog: {
    title: "",
    banner: "",
    description: "",
    content: {},
    tags: [],
    draft: false,
  },
  error: null,
  loading: false,
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

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    writeBlog: (state, action) => {
      state.blog = { ...state.blog, ...action.payload };
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadBanner.fulfilled, (state, action) => {
        state.blog.banner = action.payload;
        state.loading = false;
      })
      .addCase(uploadBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = initialState.blog;
        state.error = null;
      })
      .addCase(uploadBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export const { writeBlog, clearBlog } = blogSlice.actions;

export default blogSlice.reducer;
