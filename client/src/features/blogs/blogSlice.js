import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";

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
  async (file, { dispatch, rejectWithValue }) => {
    try {
      const fileName = Date.now() + "-" + file.name;
      const imageRef = ref(storage, `Banner/${fileName}`);
      const img = await uploadBytes(imageRef, file);
      const url = await getDownloadURL(img.ref);
      dispatch(setBanner(url));
      return url;
    } catch (err) {
      return rejectWithValue("Please upload an image");
    }
  }
);

export const uploadBlog = createAsyncThunk(
  "blog/upload",
  async ({ data, token }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/blog/createblog`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        return rejectWithValue(
          error.response.data.message || "Server error occurred"
        );
      } else if (error.request) {
        console.error("No response from server:", error.request);
        return rejectWithValue("No response from server");
      } else {
        console.error("Request error:", error.message);
        return rejectWithValue("Request error");
      }
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    writeBlog: (state, action) => {
      state.blog = { ...state.blog, ...action.payload };
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setBanner: (state, action) => {
      state.blog.banner = action.payload;
    },

    clearBlog: (state) => {
      state.blog = {
        title: "",
        banner: "",
        description: "",
        content: {},
        tags: [],
        draft: false,
      };
      state.contentText = { isReady: false };
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadBanner.fulfilled, (state) => {
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
      .addCase(uploadBlog.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { writeBlog, setError, setBanner, clearBlog } = blogSlice.actions;

export default blogSlice.reducer;
